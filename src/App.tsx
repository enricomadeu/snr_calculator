import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";

import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";

import "./App.css";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import {
	InputAdornment,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import Button from "@mui/material/Button";

interface Tx {
	ps: number;
	sn: number;
	unitPs: string;
	unitSn: string;
	typePs: string;
	typeSn: string;
}

interface Amplificador {
	id: number;
	gain: number;
	noise: number;
	unitGain: string;
	unitNoise: string;
	typeGain: string;
	typeNoise: string;
}

interface Atenuador {
	id: number;
	attenuation: number;
	unitAttenuation: string;
	type: string;
	active: boolean;
}

interface tableResult {
	id: string;
	sinal: number;
	ruido: number;
	sn: number;
}

export function App() {
	const [tx, setTx] = useState<Tx>({
		ps: 0,
		sn: 0,
		unitPs: "",
		unitSn: "",
		typePs: "W",
		typeSn: "dB",
	});
	const [amplificadores, setAmplificadores] = useState<Amplificador[]>([]);
	const [atenuadores, setAtenuadores] = useState<Atenuador[]>([
		{
			id: 0,
			attenuation: 0,
			unitAttenuation: "",
			type: "dB",
			active: false,
		},
	]);
	const [tableResults, setTableResults] = useState<tableResult[]>([]);

	const adicionarAmplificador = () => {
		const id = amplificadores.length
			? amplificadores[amplificadores.length - 1].id + 1
			: 1;

		setAtenuadores([
			...atenuadores,
			{
				id: atenuadores.length,
				attenuation: 0,
				unitAttenuation: "",
				type: "dB",
				active: false,
			},
		]);

		setAmplificadores([
			...amplificadores,
			{
				id,
				gain: 0,
				noise: 0,
				unitGain: "",
				unitNoise: "",
				typeNoise: "W",
				typeGain: "dB",
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

	const handleChangeTypeNoiseAmp = (
		event: SelectChangeEvent,
		ampModificado: Amplificador
	) => {
		const newAmplificadores = amplificadores.map((amp) => {
			if (amp.id === ampModificado.id) {
				amp.typeNoise = event.target.value;
			}
			return amp;
		});
		setAmplificadores(newAmplificadores);
	};

	const handleChangeUnitNoiseAmp = (
		event: SelectChangeEvent,
		ampModificado: Amplificador
	) => {
		const newAmplificadores = amplificadores.map((amp) => {
			if (amp.id === ampModificado.id) {
				amp.unitNoise = event.target.value;
			}
			return amp;
		});
		setAmplificadores(newAmplificadores);
	};

	const handleChangeTypeGainAmp = (
		event: SelectChangeEvent,
		ampModificado: Amplificador
	) => {
		const newAmplificadores = amplificadores.map((amp) => {
			if (amp.id === ampModificado.id) {
				amp.typeGain = event.target.value;
			}
			return amp;
		});
		setAmplificadores(newAmplificadores);
	};

	const handleChangeUnitGainAmp = (
		event: SelectChangeEvent,
		ampModificado: Amplificador
	) => {
		const newAmplificadores = amplificadores.map((amp) => {
			if (amp.id === ampModificado.id) {
				amp.unitGain = event.target.value;
			}
			return amp;
		});
		setAmplificadores(newAmplificadores);
	};

	const handleChangeTypeAtn = (
		event: SelectChangeEvent,
		atnModificado: Atenuador
	) => {
		const newAtenuadores = atenuadores.map((amp) => {
			if (amp.id === atnModificado.id) {
				amp.type = event.target.value;
			}
			return amp;
		});
		setAtenuadores(newAtenuadores);
	};

	const handleChangeUnitAtn = (
		event: SelectChangeEvent,
		atnModificado: Atenuador
	) => {
		const newAtenuadores = atenuadores.map((amp) => {
			if (amp.id === atnModificado.id) {
				amp.unitAttenuation = event.target.value;
			}
			return amp;
		});
		setAtenuadores(newAtenuadores);
	};

	const handleChangeGain = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		ampModificado: Amplificador
	) => {
		const newAmplificadores = amplificadores.map((amp) => {
			if (amp.id === ampModificado.id) {
				amp.gain = Number(event.target.value);
			}
			return amp;
		});
		setAmplificadores(newAmplificadores);
	};

	const handleChangeNoise = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		ampModificado: Amplificador
	) => {
		const newAmplificadores = amplificadores.map((amp) => {
			if (amp.id === ampModificado.id) {
				amp.noise = Number(event.target.value);
			}
			return amp;
		});
		setAmplificadores(newAmplificadores);
	};

	const handleChangeAttenuation = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		atnModificado: Atenuador
	) => {
		const newAtenuadores = atenuadores.map((atn) => {
			if (atn.id === atnModificado.id) {
				atn.attenuation = Number(event.target.value);
			}
			return atn;
		});
		setAtenuadores(newAtenuadores);
	};

	const calcular = () => {
		const resultado: tableResult[] = [];
		setTableResults([]);
		atenuadores.forEach((atn, index) => {
			const amp = amplificadores.find((amp) => amp.id === atn.id);
			if (amp) {
				const { id, sinal, sn, ruido } = calculaAmplificacao(amp, resultado);
				resultado.push({
					id,
					sinal,
					sn,
					ruido,
				});
			}
			if (index === 0) {
				const sinal = converteParaDB(tx.ps, tx.typePs, tx.unitPs);
				const sn = converteParaDB(tx.sn, tx.typeSn, tx.unitSn);
				const ruido = sinal - sn;
				resultado.push({
					id: "A",
					sinal: +sinal.toFixed(2),
					sn: +sn.toFixed(2),
					ruido: +ruido.toFixed(2),
				});
			}
			if (atn.active) {
				const { id, sinal, sn, ruido } = calculaAtenuacao(atn, resultado);
				resultado.push({
					id,
					sinal,
					sn,
					ruido,
				});
			}
		});

		console.log(resultado);
		setTableResults(resultado);
	};

	const calculaAtenuacao = (
		atn: Atenuador,
		resultado: tableResult[]
	): tableResult => {
		const id = proximaLetra(resultado[resultado.length - 1].id);
		console.log("Atenua", id);
		const ruidoConvertido = converteParaDB(
			atn.attenuation,
			atn.type,
			atn.unitAttenuation
		);
		const sinal = resultado[resultado.length - 1].sinal - ruidoConvertido;
		const ruido = resultado[resultado.length - 1].ruido - ruidoConvertido;
		const sn = sinal - ruido;
		return {
			id,
			sinal: +sinal.toFixed(2),
			sn: +sn.toFixed(2),
			ruido: +ruido.toFixed(2),
		};
	};

	const calculaAmplificacao = (
		amp: Amplificador,
		resultado: tableResult[]
	): tableResult => {
		const id = proximaLetra(resultado[resultado.length - 1].id);
		console.log("Amplifica", { id, amp });
		const ganhoConvertido = converteParaDB(
			amp.gain,
			amp.typeGain,
			amp.unitGain
		);
		const sinal = resultado[resultado.length - 1].sinal + ganhoConvertido;
		const ruidoW =
			converteParaW(
				resultado[resultado.length - 1].ruido + ganhoConvertido,
				"dB",
				""
			) + calculaUnidade(amp.noise, amp.unitNoise);
		const ruido = converteParaDB(ruidoW, "W", "");
		const sn = sinal - ruido;
		return {
			id,
			sinal: +sinal.toFixed(2),
			sn: +sn.toFixed(2),
			ruido: +ruido.toFixed(2),
		};
	};

	const converteParaDB = (
		valor: number,
		tipo: string,
		unidade: string
	): number => {
		if (tipo === "W") {
			return 10 * Math.log10(calculaUnidade(valor, unidade) / 0.001);
		} else {
			return calculaUnidade(valor, unidade);
		}
	};

	const converteParaW = (
		valor: number,
		tipo: string,
		unidade: string
	): number => {
		if (tipo === "dB") {
			return 0.001 * Math.pow(10, calculaUnidade(valor, unidade) / 10);
		} else {
			return calculaUnidade(valor, unidade);
		}
	};

	const calculaUnidade = (valor: number, unidade: string): number => {
		switch (unidade) {
			case "m":
				return valor / 1000;
			case "u":
				return valor / 1000000;
			case "n":
				return valor / 1000000000;
			default:
				return valor;
		}
	};

	const proximaLetra = (letra: string): string => {
		const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		const index = alfabeto.indexOf(letra.toUpperCase());
		return alfabeto[index + 1];
	};

	return (
		<>
			<h1>Signal Calculator</h1>
			<div className="box-group">
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
			<Grid
				container
				spacing={2}
				justifyContent="center"
				sx={{
					marginTop: "40px",
				}}
			>
				<Grid
					item
					xs={7}
					sx={{
						maxHeight: "400px",
						overflowY: "auto",
					}}
				>
					<div className="column-header">
						<h3>Amplificadores</h3>
						<IconButton onClick={() => adicionarAmplificador()}>
							<AddCircleOutlineRoundedIcon className="add-icon" />
						</IconButton>
					</div>
					<Grid className="input-group">
						<Grid item xs={1}>
							<h5>TX</h5>
						</Grid>
						<Grid item xs={5}>
							<TextField
								id="ps-tx"
								label="PS"
								type="number"
								value={tx.ps}
								onChange={(event) =>
									setTx({ ...tx, ps: Number(event.target.value) })
								}
								InputLabelProps={{
									style: {
										color: "white",
									},
								}}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											{tx.unitPs + tx.typePs}
										</InputAdornment>
									),
								}}
								sx={{
									width: "120px",
									input: {
										color: "white",
									},
								}}
							/>
							<FormControl>
								<Select
									id="unidade-ps-tx-select"
									value={tx.unitPs}
									onChange={(event) =>
										setTx({ ...tx, unitPs: event.target.value as string })
									}
									sx={{
										color: "white",
									}}
								>
									<MenuItem value={""}></MenuItem>
									<MenuItem value={"m"}>m</MenuItem>
									<MenuItem value={"u"}>u</MenuItem>
									<MenuItem value={"n"}>n</MenuItem>
								</Select>
							</FormControl>
							<FormControl>
								<Select
									id="tipo-ps-tx-select"
									value={tx.typePs}
									onChange={(event) =>
										setTx({ ...tx, typePs: event.target.value as string })
									}
									sx={{
										color: "white",
									}}
								>
									<MenuItem value={"dB"}>dB</MenuItem>
									<MenuItem value={"W"}>W</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={5}>
							<TextField
								id="sn-tx"
								label="S/N"
								type="number"
								value={tx.sn}
								onChange={(event) =>
									setTx({ ...tx, sn: Number(event.target.value) })
								}
								InputLabelProps={{
									style: {
										color: "white",
									},
								}}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											{tx.unitSn + tx.typeSn}
										</InputAdornment>
									),
								}}
								sx={{
									width: "120px",
									input: {
										color: "white",
									},
								}}
							/>
							<FormControl>
								<Select
									id="unidade-sn-tx-select"
									value={tx.unitSn}
									onChange={(event) =>
										setTx({ ...tx, unitSn: event.target.value as string })
									}
									sx={{
										color: "white",
									}}
								>
									<MenuItem value={""}></MenuItem>
									<MenuItem value={"m"}>m</MenuItem>
									<MenuItem value={"u"}>u</MenuItem>
									<MenuItem value={"n"}>n</MenuItem>
								</Select>
							</FormControl>
							<FormControl>
								<Select
									id="tipo-sn-tx-select"
									value={tx.typeSn}
									onChange={(event) =>
										setTx({ ...tx, typeSn: event.target.value as string })
									}
									sx={{
										color: "white",
									}}
								>
									<MenuItem value={"dB"}>dB</MenuItem>
									<MenuItem value={"W"}>W</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={1}></Grid>
					</Grid>
					{amplificadores.map((amp: Amplificador) => {
						return (
							<Grid
								justifyContent={"center"}
								className="input-group"
								key={amp.id}
							>
								<Grid item xs={1}>
									<h5>Amp {amp.id}</h5>
								</Grid>
								<Grid item xs={5}>
									<TextField
										id="gain-{amp.id}"
										label="Ganho"
										type="number"
										value={amp.gain}
										onChange={(event) => handleChangeGain(event, amp)}
										InputLabelProps={{
											style: {
												color: "white",
											},
										}}
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													{amp.unitGain + amp.typeGain}
												</InputAdornment>
											),
										}}
										sx={{
											width: "120px",
											input: {
												color: "white",
											},
										}}
									/>
									<FormControl>
										<Select
											id="unidade-gain-{amp.id}-select"
											value={amp.unitGain}
											onChange={(event) => handleChangeUnitGainAmp(event, amp)}
											sx={{
												color: "white",
											}}
										>
											<MenuItem value={""}></MenuItem>
											<MenuItem value={"m"}>m</MenuItem>
											<MenuItem value={"u"}>u</MenuItem>
											<MenuItem value={"n"}>n</MenuItem>
										</Select>
									</FormControl>
									<FormControl>
										<Select
											id="tipo-ganho-{amp.id}-select"
											value={amp.typeGain}
											onChange={(event) => handleChangeTypeGainAmp(event, amp)}
											sx={{
												color: "white",
											}}
										>
											<MenuItem value={"dB"}>dB</MenuItem>
											<MenuItem value={"W"}>W</MenuItem>
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={5}>
									<TextField
										id="noise-{amp.id}"
										label="Ruido"
										type="number"
										value={amp.noise}
										onChange={(event) => handleChangeNoise(event, amp)}
										InputLabelProps={{
											style: {
												color: "white",
											},
										}}
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													{amp.unitNoise + amp.typeNoise}
												</InputAdornment>
											),
										}}
										sx={{
											width: "120px",
											input: {
												color: "white",
											},
										}}
									/>
									<FormControl>
										<Select
											id="unidade-noise-{amp.id}-select"
											value={amp.unitNoise}
											onChange={(event) => handleChangeUnitNoiseAmp(event, amp)}
											sx={{
												color: "white",
											}}
										>
											<MenuItem value={""}></MenuItem>
											<MenuItem value={"m"}>m</MenuItem>
											<MenuItem value={"u"}>u</MenuItem>
											<MenuItem value={"n"}>n</MenuItem>
										</Select>
									</FormControl>
									<FormControl>
										<Select
											id="tipo-noise-{amp.id}-select"
											value={amp.typeNoise}
											onChange={(event) => handleChangeTypeNoiseAmp(event, amp)}
											sx={{
												color: "white",
											}}
										>
											<MenuItem value={"dB"}>dB</MenuItem>
											<MenuItem value={"W"}>W</MenuItem>
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={1}>
									<IconButton onClick={() => removerAmplificador(amp.id)}>
										<RemoveCircleOutlineRoundedIcon className="remove-icon" />
									</IconButton>
								</Grid>
							</Grid>
						);
					})}
				</Grid>
				<Grid
					item
					xs={5}
					sx={{
						maxHeight: "400px",
						overflowY: "auto",
					}}
				>
					<div className="column-header">
						<h3>Atenuadores</h3>
					</div>
					{atenuadores.map((atn: Atenuador) => {
						return (
							<Grid
								justifyContent={"center"}
								className="input-group"
								key={atn.id}
							>
								<Grid item xs={2}>
									<h5>Atn {atn.id === 0 ? "TX" : atn.id}</h5>
								</Grid>
								<Grid item xs={6}>
									{atn.active && (
										<>
											<TextField
												id="attenuation-{atn.id}"
												label="Ruído"
												type="number"
												value={atn.attenuation}
												onChange={(event) =>
													handleChangeAttenuation(event, atn)
												}
												InputLabelProps={{
													style: {
														color: "white",
													},
												}}
												InputProps={{
													endAdornment: (
														<InputAdornment position="end">
															{atn.unitAttenuation + atn.type}
														</InputAdornment>
													),
												}}
												sx={{
													width: "120px",
													input: {
														color: "white",
													},
												}}
											/>
											<FormControl>
												<Select
													id="unidade-{atn.id}-select"
													value={atn.unitAttenuation}
													onChange={(event) => handleChangeUnitAtn(event, atn)}
													sx={{
														color: "white",
													}}
												>
													<MenuItem value={""}></MenuItem>
													<MenuItem value={"m"}>m</MenuItem>
													<MenuItem value={"u"}>u</MenuItem>
													<MenuItem value={"n"}>n</MenuItem>
												</Select>
											</FormControl>
											<FormControl>
												<Select
													id="tipo-{atn.id}-select"
													value={atn.type}
													onChange={(event) => handleChangeTypeAtn(event, atn)}
													sx={{
														color: "white",
													}}
												>
													<MenuItem value={"dB"}>dB</MenuItem>
													<MenuItem value={"W"}>W</MenuItem>
												</Select>
											</FormControl>
										</>
									)}
								</Grid>
								<Grid item xs={1}>
									{atenuadores[atn.id].active ? (
										<IconButton onClick={() => desabilitarAtenuador(atn.id)}>
											<RemoveCircleOutlineRoundedIcon className="remove-icon" />
										</IconButton>
									) : (
										<IconButton onClick={() => habilitarAtenuador(atn.id)}>
											<AddCircleOutlineRoundedIcon className="add-icon" />
										</IconButton>
									)}
								</Grid>
							</Grid>
						);
					})}
				</Grid>
			</Grid>
			<Grid
				container
				spacing={2}
				justifyContent="center"
				sx={{
					marginTop: "40px",
				}}
			>
				<div className="column-header">
					<h3>Resultado</h3>
					<Button variant="contained" onClick={calcular}>
						Calcular
					</Button>
				</div>
				<TableContainer sx={{ width: "100%" }}>
					<Table sx={{ minWidth: 650 }}>
						<TableHead>
							<TableRow>
								<TableCell></TableCell>
								<TableCell sx={{ color: "white" }} align="center">
									Sinal (dBm)
								</TableCell>
								<TableCell sx={{ color: "white" }} align="center">
									Ruído (dBm)
								</TableCell>
								<TableCell sx={{ color: "white" }} align="center">
									S/N (dB)
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{tableResults.map((row) => {
								return (
									<TableRow key={row.id}>
										<TableCell
											sx={{ color: "white" }}
											component="th"
											scope="row"
											align="center"
										>
											{row.id}
										</TableCell>
										<TableCell sx={{ color: "white" }} align="center">
											{row.sinal}
										</TableCell>
										<TableCell sx={{ color: "white" }} align="center">
											{row.ruido}
										</TableCell>
										<TableCell sx={{ color: "white" }} align="center">
											{row.sn}
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</Grid>
		</>
	);
}
