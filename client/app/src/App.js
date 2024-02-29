import React from 'react';
import './App.css';

function App() {
	return (
		<section className="wrapper">
			<h3 className="title">Dice Game</h3>
			<div className="player-form">
				<div className="dice">Enter your name:</div>
				<input type="text" id="name" />
				<button className="btn-submit">Submit</button>
			</div>
			<div className="dice-form">
				<button className="btn-roll">Roll</button>
				<div className="result">Result:</div>
			</div>
			<div className="ranking">
				<p className="player">Players Ranking</p>
				<div className="ranking-list">
					<button className="rank">All Players</button>
					<button className="player">Ranking</button>
					<button className="points">Best Player</button>
					<button className="points">Worst Player</button>
				</div>
				<div className="ranking-table">
					<p className="rank">ID</p>
					<p className="player">Name</p>
					<p className="points">Success Percentage</p>
				</div>
			</div>
		</section>
	);
}

export default App;
