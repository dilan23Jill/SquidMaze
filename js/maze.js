let row_col;
function checkDiff() {
  if (
    freezeShape1.classList.contains("freeze") ||
    freezeShape2.classList.contains("freeze") ||
    freezeShape3.classList.contains("freeze")
  ) {
    if (freezeShape1.classList.contains("freeze")) {
      row_col = 8;
    } else if (freezeShape2.classList.contains("freeze")) {
      row_col = 11;
    } else if (freezeShape3.classList.contains("freeze")) {
      row_col = 15;
    }
    startmaze();
  } else {
    Swal.fire({
      title: "ALERT!",
      text: "CHOOSE DIFFICULT",
      imageUrl: "./images/SG_sweetalert.jpg",
      confirmButtonColor: "#fa4366",
      imageWidth: 515,
      imageHeight: 300,
      imageAlt: "SG_SWEETALERT",
    });
  }
}
function startmaze() {
  document.getElementById("btnGenerate").style.visibility = "hidden";
  document.getElementById("settings").style.visibility = "hidden";
  // inicalizacija canvasa
  var maze = document.querySelector(".maze");
  let ctx = maze.getContext("2d");
  let size = 600;

  let icon_size = (size / (row_col * row_col)) * row_col;
  let current;
  let goal;

  class Maze {
    constructor(size, rows, columns) {
      this.size = size;
      this.columns = columns;
      this.rows = rows;
      this.grid = [];
      this.stack = [];
    }
    // Nastavitev grida: Ustvarjanje novega arraya na podlagi vrstic in stolpcev
    setup() {
      for (let r = 0; r < this.rows; r++) {
        let row = [];
        for (let c = 0; c < this.columns; c++) {
          // Ustvarite nov razred Cell za vsak element v 2D arrayu in potisnite do array grida labirinta
          let cell = new Cell(r, c, this.grid, this.size);
          row.push(cell);
        }
        this.grid.push(row);
      }
      // Začetna pozicija
      current = this.grid[0][0];
      this.grid[this.rows - 1][this.columns - 1].goal = true;
    }
    // Nariše canvas tako, da nastavite velikost in postavite celice v grid arraya na canvasu.
    draw() {
      maze.width = this.size;
      maze.height = this.size;
      // nastavi prvi cell kot visited
      maze.style.background = "url('./images/SG_frontMan.png')";

      current.visited = true;
      // Pojdite skozi 2d mrežno arraya in kličite metodo show za vsako celiceo
      for (let r = 0; r < this.rows; r++) {
        for (let c = 0; c < this.columns; c++) {
          let grid = this.grid;
          grid[r][c].show(this.size, this.rows, this.columns);
        }
      }
      // Ta funkcija bo dodelila spremenljivko 'next' naključni celici izmed trenutno razpoložljivih sosednjih celic
      let next = current.checkNeighbours();
      // Če obstaja neobiskana sosednja celica
      if (next) {
        next.visited = true;
        // Dodajte trenutno celico v sklad za pomik nazaj
        this.stack.push(current);
        // ta funkcija bo označila trenutno celico na arrayu. Stolpci parametrov so posredovani
        // za nastavitev velikosti celice
        current.highlight(this.columns);
        // Ta funkcija primerja trenutno celico z naslednjo celico in odstrani ustrezne stene za vsako celico
        current.removeWalls(current, next);
        // Nastavi naslednjo celico na trenutno celico
        current = next;
        // V nasprotnem primeru, če ni razpoložljivih sosedov, se začnite backtrackat z uporabo stack
      } else if (this.stack.length > 0) {
        let cell = this.stack.pop();
        current = cell;
        current.highlight(this.columns);
      }
      // Če v skladu ni več elementov, so bile vse celice obiskane in funkcijo je mogoče končati
      if (this.stack.length === 0) {
       
        return;
      }
      //določite hitrost generiranja, in kličite funkcijo dokler funkcija ni dokončana
      window.requestAnimationFrame(() => {
        setTimeout(() => {
          this.draw();
        }, 5);
      });
    }
  }

  class Cell {
    // Konstruktor prevzame rowNum in colNum, ki bosta uporabljena kot koordinate za risanje na canvasu.
    constructor(rowNum, colNum, parentGrid, parentSize) {
      this.rowNum = rowNum;
      this.colNum = colNum;
      this.visited = false;
      this.walls = {
        topWall: true,
        rightWall: true,
        bottomWall: true,
        leftWall: true,
      };
      this.goal = false;
      // parentGrid se posreduje, da omogoči metodo checkneighbours.
      // parentSize se posreduje za nastavitev velikosti vsake celice na mreži
      this.parentGrid = parentGrid;
      this.parentSize = parentSize;
    }

    checkNeighbours() {
      let grid = this.parentGrid;
      let row = this.rowNum;
      let col = this.colNum;
      let neighbours = [];
      // Naslednje vrstice potisnejo vse razpoložljive sosede v array sosedov
      // vrne se undefined, kjer je indeks izven meja (edge cases)

      let top = row !== 0 ? grid[row - 1][col] : undefined;
      let right = col !== grid.length - 1 ? grid[row][col + 1] : undefined;
      let bottom = row !== grid.length - 1 ? grid[row + 1][col] : undefined;
      let left = col !== 0 ? grid[row][col - 1] : undefined;

      // če naslednje niso 'nedefinirane', jih potisnite v polje sosedov
      if (top && !top.visited) neighbours.push(top);
      if (right && !right.visited) neighbours.push(right);
      if (bottom && !bottom.visited) neighbours.push(bottom);
      if (left && !left.visited) neighbours.push(left);

      // Izberite naključnega soseda iz niza sosedov
      if (neighbours.length !== 0) {
        let random = Math.floor(Math.random() * neighbours.length);
        return neighbours[random];
      } else {
        return undefined;
      }
    }
    // Funkcije risanja sten za vsako celico. Klicana bo, če je ustrezna stena v konstruktorju celic nastavljena na true
    drawTopWall(x, y, size, columns, rows) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + size / columns, y);
      ctx.stroke();
    }

    drawRightWall(x, y, size, columns, rows) {
      ctx.beginPath();
      ctx.moveTo(x + size / columns, y);
      ctx.lineTo(x + size / columns, y + size / rows);
      ctx.stroke();
    }

    drawBottomWall(x, y, size, columns, rows) {
      ctx.beginPath();
      ctx.moveTo(x, y + size / rows);
      ctx.lineTo(x + size / columns, y + size / rows);
      ctx.stroke();
    }

    drawLeftWall(x, y, size, columns, rows) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + size / rows);
      ctx.stroke();
    }

    // Označi trenutno celico na gridu. Stolpci se ponovno prenesejo, da se nastavi velikost mreže.
    highlight(columns) {
      // Dodani dodatki in odštevanja, tako da označena celica prekrije stene
      let x = (this.colNum * this.parentSize) / columns + 1;
      let y = (this.rowNum * this.parentSize) / columns + 1;

      let img = new Image();
      img.src = "./images/SG_face.png";
      img.onload = function () {
        ctx.drawImage(img, x, y, icon_size, icon_size);
      };
    }
    highlighRight(columns) {
      // Dodani dodatki in odštevanja, tako da označena celica prekrije stene
      let x = (this.colNum * this.parentSize) / columns + 1;
      let y = (this.rowNum * this.parentSize) / columns + 1;

      let img = new Image();
      img.src = "./images/SG_face_right.png";
      img.onload = function () {
        ctx.drawImage(img, x, y, icon_size, icon_size);
      };
    }
    highlighLeft(columns) {
      // Dodani dodatki in odštevanja, tako da označena celica prekrije stene
      let x = (this.colNum * this.parentSize) / columns + 1;
      let y = (this.rowNum * this.parentSize) / columns + 1;

      let img = new Image();
      img.src = "./images/SG_face_left.png";
      img.onload = function () {
        ctx.drawImage(img, x, y, icon_size, icon_size);
      };
    }
    highlightDown(columns) {
      // Dodani dodatki in odštevanja, tako da označena celica prekrije stene
      let x = (this.colNum * this.parentSize) / columns + 1;
      let y = (this.rowNum * this.parentSize) / columns + 1;

      let img = new Image();
      img.src = "./images/SG_face_down.png";
      img.onload = function () {
        ctx.drawImage(img, x, y, icon_size, icon_size);
      };
    }

    removeWalls(cell1, cell2) {
      // primerja z dvema celicama na osi x
      let x = cell1.colNum - cell2.colNum;
      // Odstrani ustrezne stene, če je na osi x drugačna
      if (x === 1) {
        cell1.walls.leftWall = false;
        cell2.walls.rightWall = false;
      } else if (x === -1) {
        cell1.walls.rightWall = false;
        cell2.walls.leftWall = false;
      }
      // primerja z dvema celicama na osi x
      let y = cell1.rowNum - cell2.rowNum;
      // Odstrani ustrezne stene, če je na osi x drugačna
      if (y === 1) {
        cell1.walls.topWall = false;
        cell2.walls.bottomWall = false;
      } else if (y === -1) {
        cell1.walls.bottomWall = false;
        cell2.walls.topWall = false;
      }
    }
    // Nariše vsako od celic na platnu labirinta
    show(size, rows, columns) {
      let x = (this.colNum * size) / columns;
      let y = (this.rowNum * size) / rows;

      ctx.strokeStyle = "#ffffff";
      ctx.fillStyle = "transparent";
      ctx.shadowBlur = 4;
      ctx.shadowColor = "#fa4366";
      ctx.lineWidth = 2;
      if (this.walls.topWall) this.drawTopWall(x, y, size, columns, rows);
      if (this.walls.rightWall) this.drawRightWall(x, y, size, columns, rows);
      if (this.walls.bottomWall) this.drawBottomWall(x, y, size, columns, rows);
      if (this.walls.leftWall) this.drawLeftWall(x, y, size, columns, rows);
      if (this.visited) {
        ctx.fillRect(x + 1, y + 1, size / columns - 2, size / rows - 2);
      }
      if (this.goal) {
        let exitImg = new Image();
        exitImg.src = "./images/SG_money.png";

        ctx.drawImage(exitImg, x, y, icon_size, icon_size);

        //ctx.fillStyle = "white";
        //ctx.fillRect(x + 1, y + 1, size / columns - 2, size / rows - 2);
      }
    }
  }
  document.addEventListener("keydown", move);
  function move(e) {
    let key = e.key;
    let row = current.rowNum;
    let col = current.colNum;

    switch (key) {
      case "ArrowUp":
        if (!current.walls.topWall) {
          let next = newMaze.grid[row - 1][col];
          current = next;
          newMaze.draw();
          current.highlight(newMaze.columns);
        }
        break;

      case "ArrowRight":
        if (!current.walls.rightWall) {
          let next = newMaze.grid[row][col + 1];
          current = next;
          newMaze.draw();
          current.highlighRight(newMaze.columns);
          if (current.goal) {
            Swal.fire({
              title: "YOU WIN!",
              html: '<iframe width="450" height="300" src="./video/winning_SweetAlert.mp4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
              confirmButtonColor: "#fa4366",
              confirmButtonText: "PLAY AGAIN",
            });
          }
        }
        break;

      case "ArrowDown":
        if (!current.walls.bottomWall) {
          let next = newMaze.grid[row + 1][col];
          current = next;
          newMaze.draw();
          current.highlightDown(newMaze.columns);
          if (current.goal) {
            Swal.fire({
              title: "YOU WIN!",
              html: '<iframe width="450" height="300" src="./video/winning_SweetAlert.mp4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
              confirmButtonColor: "#fa4366",
              confirmButtonText: "PLAY AGAIN",
            });
          }
        }
        break;

      case "ArrowLeft":
        if (!current.walls.leftWall) {
          let next = newMaze.grid[row][col - 1];
          current = next;
          newMaze.draw();
          current.highlighLeft(newMaze.columns);
        }
        break;
    }
  }
  let newMaze = new Maze(size, row_col, row_col);
  newMaze.setup();
  newMaze.draw();
}

/* replay.addEventListener("click", () => {
  location.reload();
}); 

close.addEventListener("click", () => {
  complete.style.display = "none";
}); */
