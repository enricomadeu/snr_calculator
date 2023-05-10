import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";

import "./App.css";

interface Tx {
	output: number;
	type: string;
	sn: number;
}

interface Amplificador {
	id: number;
	gain: number;
	input: number;
	output: number;
	noise: number;
	type: string;
}

interface Atenuador {
	id: number;
	attenuation: number;
	input: number;
	output: number;
	type: string;
	active: boolean;
}

export function App() {
	const [tx, setTx] = useState<Tx>({
		output: 0,
		type: "dB",
		sn: 0,
	});
	const [amplificadores, setAmplificadores] = useState<Amplificador[]>([]);
	const [atenuadores, setAtenuadores] = useState<Atenuador[]>([
		{
			id: 0,
			attenuation: 0,
			input: 0,
			output: 0,
			type: "dB",
			active: false,
		},
	]);

	const adicionarAmplificador = () => {
		const id = amplificadores.length
			? amplificadores[amplificadores.length - 1].id + 1
			: 1;

		setAtenuadores([
			...atenuadores,
			{
				id: atenuadores.length,
				attenuation: 0,
				input: 0,
				output: 0,
				type: "dB",
				active: false,
			},
		]);

		setAmplificadores([
			...amplificadores,
			{
				id,
				gain: 0,
				input: 0,
				output: 0,
				type: "dB",
				noise: 0,
			},
		]);
	};

	const removerAmplificador = (id: number) => {
		if (amplificadores.length) {
			const newAmplificadores = amplificadores.filter((amp) => amp.id !== id);
			const newAtenuadores = atenuadores.filter((atn) => atn.id !== id);
			newAmplificadores.forEach((amp, index) => {
				amp.id = index + 1;
			});
			newAtenuadores.forEach((atn, index) => {
				atn.id = index;
			});
			setAtenuadores(newAtenuadores);
			setAmplificadores(newAmplificadores);
		}
	};

	const habilitarAtenuador = (id: number) => {
		const newAtenuadores = atenuadores.map((atn) => {
			if (atn.id === id) {
				atn.active = true;
			}
			return atn;
		});
		setAtenuadores(newAtenuadores);
	};

	const desabilitarAtenuador = (id: number) => {
		const newAtenuadores = atenuadores.map((atn) => {
			if (atn.id === id) {
				atn.active = false;
			}
			return atn;
		});
		setAtenuadores(newAtenuadores);
	};

	return (
		<>
			<h1>Signal Calculator</h1>
			<div className="box box-group">
				<div className="box tx">
					<h5>TX</h5>
				</div>
				<div className="amp">
					{atenuadores[0].active ? (
						<IconButton onClick={() => desabilitarAtenuador(atenuadores[0].id)}>
							<RemoveCircleOutlineRoundedIcon className="remove-icon" />
						</IconButton>
					) : (
						<IconButton onClick={() => habilitarAtenuador(atenuadores[0].id)}>
							<AddCircleOutlineRoundedIcon className="add-icon" />
						</IconButton>
					)}
					{atenuadores[0].active && <div className="atn-line" />}
					<div className="line" />
				</div>
				{amplificadores.map((amp: Amplificador, index: number) => {
					return (
						<div className="amp-group" key={amp.id}>
							<div className="amp">
								<span>{amp.id}</span>
								<div className="box tx">
									<PlayArrowRoundedIcon />
								</div>
							</div>
							<div className="amp">
								{atenuadores[index + 1].active ? (
									<IconButton
										onClick={() =>
											desabilitarAtenuador(atenuadores[index + 1].id)
										}
									>
										<RemoveCircleOutlineRoundedIcon className="remove-icon" />
									</IconButton>
								) : (
									<IconButton
										onClick={() =>
											habilitarAtenuador(atenuadores[index + 1].id)
										}
									>
										<AddCircleOutlineRoundedIcon className="add-icon" />
									</IconButton>
								)}
								{atenuadores[index + 1].active && <div className="atn-line" />}
								<div className="line" />
							</div>
						</div>
					);
				})}
				<div className="box tx">
					<h5>RX</h5>
				</div>
			</div>
			<Grid container spacing={2} justifyContent="center">
				<Grid item xs={3}>
					<div className="column-header">
						<h3>Amplificadores</h3>
						<IconButton onClick={() => adicionarAmplificador()}>
							<AddCircleOutlineRoundedIcon className="add-icon" />
						</IconButton>
					</div>
					<div className="input-group">
						<h5>TX</h5>
					</div>
					{amplificadores.map((amp: Amplificador) => {
						return (
							<div className="input-group" key={amp.id}>
								<h5>Amp {amp.id}</h5>
								<IconButton onClick={() => removerAmplificador(amp.id)}>
									<RemoveCircleOutlineRoundedIcon className="remove-icon" />
								</IconButton>
							</div>
						);
					})}
				</Grid>
				<Grid item xs={3}>
					<div className="column-header">
						<h3>Atenuadores</h3>
					</div>
					{atenuadores.map((atn: Atenuador) => {
						return (
							<div className="input-group" key={atn.id}>
								<h5>Atn {atn.id === 0 ? "TX" : atn.id}</h5>
								{atenuadores[atn.id].active ? (
									<IconButton onClick={() => desabilitarAtenuador(atn.id)}>
										<RemoveCircleOutlineRoundedIcon className="remove-icon" />
									</IconButton>
								) : (
									<IconButton onClick={() => habilitarAtenuador(atn.id)}>
										<AddCircleOutlineRoundedIcon className="add-icon" />
									</IconButton>
								)}
							</div>
						);
					})}
				</Grid>
			</Grid>
		</>
	);
}
