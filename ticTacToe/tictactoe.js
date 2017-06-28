$.fn.extend({
	animateCss: function(animationName) {
		var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		this.addClass('animated ' + animationName)
			.one(animationEnd, function() {
				$(this)
					.removeClass('animated ' + animationName);
			});
	}
});
$(function() {
	var data = {
		side: 500,
		playerToken: '',
		pcToken: '',
		board: ['', '', '', '', '', '', '', '', ''],
		boxes: [],
		gameState: 0,
		wins: {
			player: 0,
			pc: 0
		},
		draws: 0,
		winner: '',
		games: 0,
		difficulty: 'easy'
	};
	var tictactoe = {
		//Setters and getters------------------------------------------------------------
		pcWins: function() {
			return data.wins.pc;
		},
		playerWins: function() {
			return data.wins.player;
		},
		draws: function() {
			return data.draws;
		},
		games: function() {
			return data.games;
		},
		side: function() {
			return data.side;
		},
		winner:function(){
return data.winner;
		},
		gameState: function() {
			return data.gameState;
		},
		setGameState: function(state) {
			data.gameState = state;
		},
		setDifficulty: function(diff) {
			if (diff == "hard" || diff == "easy") data.difficulty = diff;
		},
		enableClicks: function() {
			document.getElementById("ticTacToe")
				.style.pointerEvents = "auto";
		},
		disableClicks: function() {
			document.getElementById("ticTacToe")
				.style.pointerEvents = "none";
		},
		setToken: function(token) {
			if (token == "tokenX") {
				data.playerToken = "x";
				data.pcToken = "o";
			} else {
				data.playerToken = "o";
				data.pcToken = "x";
			}
		},
		//Canvas methods------------------------------------------------------------
		drawCanvas: function(canvas) {
			var boneH = new Image();
			boneH.src = "assets/bone_h.svg";
			var boneV = new Image();
			boneV.src = "assets/bone_v.svg";
			var side = data.side;
			var ctx = canvas.getContext("2d");
			var patternH = ctx.createPattern(boneH, "repeat");
			var patternV = ctx.createPattern(boneV, "repeat");
			ctx.beginPath();
			ctx.rect(26, 26, 450, 450);
			ctx.fillStyle = 'rgba(51, 50, 50, 0.32)';
			ctx.fill();
			ctx.lineWidth = side / 12;
			//horizontal lines
			ctx.beginPath();
			ctx.strokeStyle = patternH;
			//first horizontal line          
			ctx.moveTo(0, side / 20);
			ctx.lineTo(side, side / 20);
			ctx.stroke();
			//second horizontal line
			ctx.moveTo(0, side / 3);
			ctx.lineTo(side, side / 3);
			ctx.stroke();
			//third horizontal line
			ctx.moveTo(0, 2 * side / 3);
			ctx.lineTo(side, 2 * side / 3);
			ctx.stroke();
			//fourth horizontal line
			ctx.moveTo(0, side - (side / 20));
			ctx.lineTo(side, side - (side / 20));
			ctx.stroke();
			//vertical lines
			ctx.beginPath();
			ctx.strokeStyle = patternV;
			//first vertical line
			ctx.moveTo(side / 20, 0);
			ctx.lineTo(side / 20, side);
			ctx.stroke();
			//second vertical line
			ctx.moveTo(side / 3, 0);
			ctx.lineTo(side / 3, side);
			ctx.stroke();
			//third vertical line
			ctx.moveTo(2 * side / 3, 0);
			ctx.lineTo(2 * side / 3, side);
			ctx.stroke();
			//fourth vertical line
			ctx.moveTo(side - (side / 20), 0);
			ctx.lineTo(side - (side / 20), side);
			ctx.stroke();
			data.boxes = [{
				top: {
					x: 0,
					y: 0
				},
				bottom: {
					x: side / 3,
					y: side / 3
				}
			}, {
				top: {
					x: side / 3,
					y: 0
				},
				bottom: {
					x: 2 * side / 3,
					y: side / 3
				}
			}, {
				top: {
					x: 2 * side / 3,
					y: 0
				},
				bottom: {
					x: side,
					y: side / 3
				}
			}, {
				top: {
					x: 0,
					y: side / 3
				},
				bottom: {
					x: side / 3,
					y: 2 * side / 3
				}
			}, {
				top: {
					x: side / 3,
					y: side / 3
				},
				bottom: {
					x: 2 * side / 3,
					y: 2 * side / 3
				}
			}, {
				top: {
					x: 2 * side / 3,
					y: side / 3
				},
				bottom: {
					x: side,
					y: 2 * side / 3
				}
			}, {
				top: {
					x: 0,
					y: 2 * side / 3
				},
				bottom: {
					x: side / 3,
					y: side
				}
			}, {
				top: {
					x: side / 3,
					y: 2 * side / 3
				},
				bottom: {
					x: 2 * side / 3,
					y: side
				}
			}, {
				top: {
					x: 2 * side / 3,
					y: 2 * side / 3
				},
				bottom: {
					x: side,
					y: side
				}
			}];
		},
		renderBoard: function(canvas) {
			var boxes = data.boxes;
			var board = data.board;
			var side = data.side;
			var ctx = canvas.getContext("2d");
			ctx.clearRect(0, 0, side, side);
			var image = new Image(100, 100);
			this.drawCanvas(canvas);
			for (var i = 0; i < 9; i++) {
				if (board[i]) {
					image.src = (board[i] == 'x') ? "assets/bones.svg" : "assets/skull.svg";
					image.width = 100;
					switch (i) {
						case 0:
							ctx.drawImage(image, boxes[i].top.x + 20.83 * 2.8, boxes[i].top.y + 20.83 * 2.8, ((side / 3) / 2), ((side / 3) / 2));
							break;
						case 1:
							ctx.drawImage(image, boxes[i].top.x + 20.83 * 2, boxes[i].top.y + 20.83 * 2.8, ((side / 3) / 2), ((side / 3) / 2));
							break;
						case 2:
							ctx.drawImage(image, boxes[i].top.x + 20.83 * 1.2, boxes[i].top.y + 20.83 * 2.8, ((side / 3) / 2), ((side / 3) / 2));
							break;
						case 3:
							ctx.drawImage(image, boxes[i].top.x + 20.83 * 2.8, boxes[i].top.y + 20.83 * 2, ((side / 3) / 2), ((side / 3) / 2));
							break;
						case 4:
							ctx.drawImage(image, boxes[i].top.x + 20.83 * 2, boxes[i].top.y + 20.83 * 2, ((side / 3) / 2), ((side / 3) / 2));
							break;
						case 5:
							ctx.drawImage(image, boxes[i].top.x + 20.83 * 1.2, boxes[i].top.y + 20.83 * 2, ((side / 3) / 2), ((side / 3) / 2));
							break;
						case 6:
							ctx.drawImage(image, boxes[i].top.x + 20.83 * 2.8, boxes[i].top.y + 20.83 * 1.2, ((side / 3) / 2), ((side / 3) / 2));
							break;
						case 7:
							ctx.drawImage(image, boxes[i].top.x + 20.83 * 2, boxes[i].top.y + 20.83 * 1.2, ((side / 3) / 2), ((side / 3) / 2));
							break;
						case 8:
							ctx.drawImage(image, boxes[i].top.x + 20.83 * 1.2, boxes[i].top.y + 20.83 * 1.2, ((side / 3) / 2), ((side / 3) / 2));
							break;
					}
					// ctx.drawImage(image, boxes[i].top.x + (((side / 3) / 4)+20.83), boxes[i].top.y + (((side / 3) / 4)+20.83),((side / 3) / 2),((side / 3) / 2));
				}
			}
		},
		//gameplay functions--------------------------------------------------------------------------------
		isValid:function(x,y){
		var boxes = data.boxes;
			var board = data.board;
			for (var i = 0; i < 9; i++) {
				var box = boxes[i];
				if (x > box.top.x && y > box.top.y && x < box.bottom.x && y < box.bottom.y && board[i] == '') {
					if(!board[i]){
					return i;
					
				}
				return false;
				}
			}
		},
		playerMove: function(i) {
		
					
					data.board[i] = data.playerToken;
					setTimeout(function() {
						view.render();
					
					}, 200);
					
				
				
				
			
		},
		resetGame: function() {
			//reset game variables
			tictactoe.setGameState(0);
			data.board = ['', '', '', '', '', '', '', '', ''];
			data.winner = '';
			data.playerToken = '';
			data.pctoken = '';
		},
		pcMove: function() {
			var empties = [];
			for (i = 0; i < 9; i++) {
				if (data.board[i] == '') empties.push(i);
			}
			//if (data.difficulty == "easy") {
				while (true) {
					var i = Math.floor(Math.random() * empties.length);
					data.board[empties[i]] = data.pcToken;
					return;
				}
			//} else if (data.difficulty == "hard") {}
		},
		getMousePos: function(canvas, evt) {
			var rect = canvas.getBoundingClientRect();
			return {
				x: evt.clientX - rect.left,
				y: evt.clientY - rect.top
			};
		},
		checkWin: function(player) {
			if (tictactoe.gameState() == 1) {
				var b = data.board;
				token = (player == "player") ? data.playerToken : data.pcToken;
				if (
					(b[0] == token && b[1] == token && b[2] == token) || (b[3] == token && b[4] == token && b[5] == token) || (b[6] == token && b[7] == token && b[8] == token) || (b[0] == token && b[3] == token && b[6] == token) || (b[1] == token && b[4] == token && b[7] == token) || (b[2] == token && b[5] == token && b[8] == token) || (b[0] == token && b[4] == token && b[8] == token) || (b[2] == token && b[4] == token && b[6] == token)) {
					data.winner = player;
					if (player == "player") {
						data.wins.player++;
					} else {
						data.wins.pc++;
					}
					data.games++;
				

					return;
				}
				if (b.every((a) => {
						return a
					})) { //if gameboard is full then we have a draw
					data.winner = "draw";
					data.draws++;
					data.games++;
			
					return;
				}
			}
		},
		init: function() {
			view.init();
		}
	};
	var view = {
		init: function() {
			
			this.$canvas = document.getElementById("ticTacToeCanvas");
			this.$select = document.getElementById("tokenSelection");
			this.$pcWins = $("#pcWins");
			this.$playerWins = $("#playerWins");
			this.$draws = $("#draws");
			this.$games = $("#games");
			this.$canvasContainer = $("#canvasContainer");
			this.$gameEnd = document.getElementById("gameEnd");
			this.$loseOrWin = $("#loseOrWin");
	
			//tictactoe.drawCanvas(this.$canvas);
				//Select token and difficulty (difficulty TODO)
			this.$select.addEventListener("click", function(e) {
				if (e.target !== e.currentTarget&&e.target!=="playAgain") {
					var clickedItem = e.target.id;
					tictactoe.setDifficulty(clickedItem);
					if (clickedItem == "hard") {
						$('#hard')
							.addClass('active');
						$('#easy')
							.removeClass('active');
						return;
					}
					if (clickedItem == "easy") {
						$('#easy')
							.addClass('active');
						$('#hard')
							.removeClass('active');
						return;
					}
					tictactoe.disableClicks();
				
					$('#tokenSelection')
						.addClass('magictime holeOut');
					//$('#tokenSelection')
						//.animateCss('fadeOut');
					tictactoe.setToken(clickedItem);
					//αυτά να γίνονται όταν τελειώνει το animation. Προς το παρον το κάνω με timeout
					setTimeout(function() {
						$('#tokenSelection')
						.removeClass('magictime holeOut');
						if (clickedItem == "tokenO") tictactoe.pcMove();
						tictactoe.setGameState(1);
						view.render();
					}, 1000);
				}
				e.stopPropagation();
			}, false);
			//click on canvas to play
			this.$canvas.addEventListener('click', function(e) {
				console.log("click");
				tictactoe.disableClicks();
				var mousePos = tictactoe.getMousePos(this, e);
				tictactoe.disableClicks();
				var pos=tictactoe.isValid(mousePos.x, mousePos.y);
				console.log("pos "+pos);
				 (pos){
				 	console.log("playerMove");
				tictactoe.playerMove(pos);
				tictactoe.checkWin("player");
				if(!tictactoe.winner()){
				setTimeout(function() {
					console.log("pcMove");
					tictactoe.pcMove();
					tictactoe.checkWin("pc");
					
					view.render();
				}, 800);
			}
			}
				e.stopPropagation();
			}, false);
		
			//ενεργοποιώ και να απενεργοποιώ τa click events ανάλογα με το state γιατί πιάνει το δεύτερο
			//click event για το τέλος του παιχνι
			this.$gameEnd.addEventListener('click', function(e) {
				var clickedItem = e.target.id;
				console.log("clicked is "+clickedItem);
			$('#gameEnd')
						.addClass('magictime holeOut');
				setTimeout(function() {
						$('#gameEnd')
						.removeClass('magictime holeOut');
					tictactoe.disableClicks();
					tictactoe.resetGame();
					view.render();
				}, 1000);
				e.stopPropagation();
			}, false);
			view.render();
		},
		render: function() {
			tictactoe.enableClicks();
			switch (tictactoe.gameState()) {
				case 0:
					this.$select.style.display = 'block';
					this.$canvas.style.display = 'none';
					this.$gameEnd.style.display = 'none';
					setTimeout(function() {
				$("h1").animateCss('flash');
			}, 500);
				
		setTimeout(function() {
			$(".fancy").animateCss('shake');
			}, 1500);
					break;
				case 1:
					this.$select.style.display = 'none';
					this.$canvas.style.display = 'inline';
					this.$gameEnd.style.display = 'none';
					tictactoe.renderBoard(this.$canvas);

					if(tictactoe.winner()){
						this.$canvasContainer.animateCss('pulse');
					setTimeout(function(){ 
					tictactoe.setGameState(2);
					view.render();
					},1500);
}
					break;
				case 2: //display win and display button to play again

					this.$select.style.display = 'none';
					this.$canvas.style.display = 'none';
				this.$gameEnd.style.display = 'block';
					this.$pcWins.html(tictactoe.pcWins());
					this.$playerWins.html(tictactoe.playerWins());
					this.$draws.html(tictactoe.draws());
					this.$games.html(tictactoe.games());
					if (tictactoe.winner() == "player") {
						this.$loseOrWin.html("You won!");
					} else if(tictactoe.winner()=="pc") {
						this.$loseOrWin.html("You lost!");
					}else{
						this.$loseOrWin.html("It's a draw!");
					}
				
				
					break;
			}
		}
	};
	tictactoe.init();
}());