import {Paper, ThemeProvider} from "@mui/material";
import "../styles/Post.css";
import Header from "./Header";
import {getTheme} from "../styles/themes/themes";


function About() {
    // paperStyle is used to style the paper component
    const paperStyle = {padding: '50px 20px', width: 600, margin:'20px auto'}

    const currTheme = getTheme();

    return (
        <ThemeProvider theme={currTheme}>
            <Paper style = {{minHeight: '100vh'}}>
                <Header/>
                <Paper elevation = {3} style={paperStyle}>
                    <h1 className="center"> Mission statement </h1>
                    Here at Enviro, we are a group of young people, disappointed by the lack of effort being done on
                    combatting climate change. Desperate to find a way to help, we thought: "what better way than by
                    stopping the carbon emissions at the source?" This led to the question "how?" We then realized,
                    by knowing in what ways you increase your carbon footprint and knowing exactly how you can reduce
                    them, everybody can do their own part in helping with carbon emissions. This is why we started
                    Enviro, so everybody can see exactly how they can improve and help the environment, from a simple
                    short quiz. And what better motivator than social acceptance? We decided to
                    separate ourselves from other environmental sites by adding a social media aspect, where you can
                    share your score, compete with friends, and learn how to improve! Our dream at Enviro, is that
                    everybody can learn how to reduce their carbon footprint, for a cleaner and better tomorrow.
                </Paper>
                <Paper elevation = {3} style={paperStyle}>
                    <h1 className="center"> About us </h1>
                    About Us: Here at 4M, we are a group of 4 minority students at the University of Florida, passionate
                    about social issues within our country, trying to make a change for the better. Although we are a
                    group of computer science and engineering students in our final years, each of us have our own back
                    stories and heritages, all leading us to fight for a better tomorrow. We believe that with enough
                    effort from individuals and corporations, we can win the battle against climate change to ensure that
                    the future of our next generations isn't bleak.
                </Paper>
            </Paper>
        </ThemeProvider>
    );
}

export default About;
