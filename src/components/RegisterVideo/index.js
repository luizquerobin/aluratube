import { createClient } from "@supabase/supabase-js";
import React from "react";
import { StyledRegisterVideo } from "./styles";

function useForm(propsDoForm) {
	const [values, setValues] = React.useState(propsDoForm.initialValues)
	return {
		values,
		handleChange: (evento) => {
			const value = evento.target.value
			const name = evento.target.name
			setValues({
				...values,
				[name]: value,
			})
		},
		clearForm() {
			setValues({})
		}
	}
}

function getThumbnail(url) {
	return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`
}

const PROJECT_URL = 'https://slwhpddjofltpgijeswa.supabase.co'
const PUBLIC_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsd2hwZGRqb2ZsdHBnaWplc3dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxNjM0MDksImV4cCI6MTk4MzczOTQwOX0.dIiPY8CQRRrYf41wDMnoNk-M-cASYbBGR8wMw_2qs1o'
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

export default function RegisterVideo() {
	const formCadastro = useForm({
		initialValues: { titulo: "Zutomayo Music", url: "https://youtu.be/6OC92oxs4gA" }
	})
	const [formVisivel, setFormVisivel] = React.useState(false)

	return (
		<StyledRegisterVideo>
			<button className="add-video" onClick={() => setFormVisivel(true)}>
				+
			</button>
			{formVisivel
				? (
					<form onSubmit={(evento) => {
						evento.preventDefault()
						console.log(formCadastro.values)

						supabase.from('video').insert({
							title: formCadastro.values.titulo,
							url: formCadastro.values.url,
							thumb: getThumbnail(formCadastro.values.url),
							playlist: "outros"
						})
							.then((oqueveio) => {
								console.log(oqueveio)
							})
							.catch((err) => {
								console.log(err)
							})
					}}>
						<div>
							<button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
								X
							</button>
							<input
								placeholder="Título do vídeo"
								name="titulo"
								value={formCadastro.values.titulo}
								onChange={formCadastro.handleChange}
							/>
							<input
								placeholder="URL"
								name="url"
								value={formCadastro.values.url}
								onChange={formCadastro.handleChange}
							/>
							<button type="submit">
								Cadastrar
							</button>
						</div>
					</form>
				)
				: false}
		</StyledRegisterVideo >
	)
}

