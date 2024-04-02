import { Box, Button, Card, Slider, Switch, TextField, Typography } from "@mui/material";
import config from "../../config";
import { navigate } from "wouter/use-browser-location";
import { useState } from "react";

export default function Depth(): JSX.Element {
    const [unit, setUnit] = useState<'meters' | 'ft'>('ft');
    const [depth, setDepth] = useState(0);

    function handleSliderChange(_: React.ChangeEvent<HTMLInputElement>, newValue: number) {
        setDepth(newValue);
    }

    function handleDepthChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value: number = Number(event.target.value);
        setDepth(value);
    }

    function switchUnits() {
        setUnit(unit === 'ft' ? 'meters' : 'ft');
    }

    return (
        <>
            <Typography marginBottom='1rem' textAlign='center' variant='h4'>
                Depth
            </Typography>

            <Card
                raised
                variant='outlined'
                sx={{
                    margin: '0 1rem 1rem 1rem',
                    padding: '1rem',
                    width: '100%',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                }}
            >
                <Box
                    justifyItems='center'
                    alignItems='center'
                    display='grid'
                    gridTemplateColumns='repeat(3, 3rem)'
                    gap={2}
                >
                    <Box justifySelf='end' width='100%'>
                        <Typography>feet</Typography>
                    </Box>

                    <Box>
                        <Switch
                            onChange={switchUnits}
                            sx={{
                                "&.MuiSwitch-root .MuiSwitch-switchBase": {
                                    color: '#154733'
                                },

                                "&.MuiSwitch-root .Mui-checked": {
                                    color: '#154733'
                                }
                            }}
                        />
                    </Box>

                    <Box justifySelf='start'>
                        <Typography>meters</Typography>
                    </Box>
                </Box>

                <Slider
                    sx={{ width: '85%' }}
                    onChange={handleSliderChange}
                    value={depth}
                    step={1}
                    min={0}
                    max={unit === 'ft' ? 328 : 100}
                    valueLabelDisplay="auto"
                />

                <TextField
                    id="outlined-number"
                    label={unit}
                    type="number"
                    value={depth}
                    onChange={handleDepthChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={{ width: '85%' }}
                />
            </Card>

            <Button
                sx={{ width: '90%', height: '4rem' }}
                variant='contained'
                onClick={() => navigate(`${config.basePath}/review`)}
            >
                Review Input
            </Button>
        </>
    );
}
