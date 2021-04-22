import {Container, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    aboutMe: {
        marginBottom: theme.spacing(6),
        marginTop: theme.spacing(3),
        fontWeight: 'bold',
        // boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.75)'
    },
    content: {
        marginBottom: theme.spacing(6),
    }
}))

export default function About() {
    const classes = useStyles()

    return(
        <Container>
            <Typography variant="h2" color="secondary" className={classes.aboutMe}>
                About me
            </Typography>
            <Container className={classes.content}>
                <Typography paragraph>
                    Nazywam się Tomasz Grzybowski. Mam 17 lat i uczęszczam do I klasy szkoły średniej. Jestem wysokim, dobrze zbudowanym mężczyzną, o krótkich blond włosach. Mam niebieskie oczy i codziennie u mnie na twarzy widnieje szeroki uśmiech, ale zdarzają się też dni kiedy humor mi nie dopisuje i wtedy ten uśmiech znika z mojej twarzy.
                </Typography>
                <Typography paragraph>
                    Kiedy zdarzy się, że ktoś ma jakiś problem albo kłopot zawsze staram się mu jak najlepiej pomóc. Jestem człowiekiem spokojnym, otwartym i szczerym. Ta szczerość niestety nie zawsze jest odbierana w pozytywny sposób przez drugie osoby. Ja jednak uważam, że każdy powinien być z drugą osobą szczery i powiedzieć jej co myśli w danej sytuacji. Wnoszę pogodny nastrój w moim otoczeniu, razem z przyjaciółmi nie potrafię się nudzić. Zawsze potrafimy znaleźć sobie ciekawe zajęcie.
                </Typography>
                <Typography paragraph>
                    Ale jak każdy człowiek posiadam również wady. Jedną z nich jest niestety lenistwo. Staram się z tym walczyć jak tylko mogę. Najlepiej pomaga mi w tym moja mama i siostra, które pilnują żebym więcej czasu poświęcał nauce i czytaniu książek. Nie zawsze jestem tym zachwycony i złoszczę się na nie za to, ale wiem że mają rację.
                    Moje zainteresowania są ciekawe, ponieważ bardzo lubię grać w siatkówkę, pływać, tańczyć i bawić się do samego rana. Jednak moim głównym zainteresowaniem jest muzyka i komputer.
                </Typography>
                <Typography paragraph>
                    Uwielbiam słuchać hip-hopu i techno, dlatego często wyjeżdżam z kumplami na kilkudniowe imprezy muzyczne. Komputer to dla mnie okno na świat. Bardzo lubię rozmawiać na czacie i poznawać różnych ludzi. Często spotykam tam osoby, od których dowiaduję się różnych ciekawych rzeczy, jednym słowem łączę przyjemne z pożytecznym. Choć bardzo lubię pracować z komputerem to staram się nie spędzać przy nim zbyt dużo czasu.
                </Typography>
                <Typography paragraph>
                    Jestem zabawną i komunikatywną osobą. Myślę, że potrafiłbym zachować się w każdej sytuacji. Wiem, iż aby przetrwać w życiu muszę zdobyć wykształcenie, dlatego nigdy się nie poddaję, zawsze dążę do celu nawet w trudnych sytuacjach!
                    Mam wielu przyjaciół w tym kilku sprawdzonych i myślę, że jestem ogólnie lubiany gdyż na co dzień spotykam się z wieloma gestami sympatii, które staram się odwzajemniać
                </Typography>
                <Typography paragraph>
                    No cóż, lepsze to niż Lorem Ipsum raczej.
                </Typography>
            </Container>
        </Container>
    );
}