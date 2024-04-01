import { Button, Card, Typography } from "@mui/material";
import config from "../../config";
import { navigate } from "wouter/use-browser-location";

export default function Landing(): JSX.Element {
    return (
        <>
            <Typography marginBottom='1rem' textAlign='center' variant='h4'>iArsenic</Typography>

            <Card raised variant='outlined' sx={{ margin: '0 1rem 1rem 1rem', padding: '1rem'}}>
                <Typography variant='body1'>
                    iArsenic is an estimates the arsenic concentration for a well in Bangladesh based on its geographic region, depth and visible staining on the well. This is achieved by aggregating source data about these wells and using that aggregate data to produce expert system prediction models which are available via a web-app.
                </Typography>
            </Card>

            <Card raised variant='outlined' sx={{ margin: '0 1rem 1rem 1rem', padding: '1rem'}}>
                <Typography variant='body1'>
                    In 2023 machine learning and artificial intelligence are becoming ever more prevalent, this project explores the potential impact this field could have on predicting the arsenic pollution of groundwater by empowering users with the knowledge of an expert well surveyor in an accessible way.
                </Typography>
            </Card>

            <Button
                sx={{ width: '90%', height: '4rem' }}
                variant='contained'
                onClick={() => navigate(`${config.basePath}/briefing`)}
            >
                Get Started
            </Button>
        </>
    )
}