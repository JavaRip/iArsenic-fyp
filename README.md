# iArsenic –  Instant Arsenic screening of hand pump tubewells in Bangladesh

Live at https://portsoc.github.io/iArsenic

## Components:

* `data/` — source data
  * it specifies measured arsenic concentrations in tubewells around Bangladesh

* `docs/` — the website

* `preprocessing/` — processing scripts
  * these turn data from the source CSV form into something consumed by the website and other tools
  * then there are tools for CLI running of estimates and testing

* `preprocessing/geodata/` – scripts that use Bangladesh geo-boundary data
  * includes experiments with visualization of the various data we have

* `rscripts/` — original scripts in R

* `server/` — server for request log database
  * in a Google Cloud Function

## Deploying a Model

The following steps are taken to deploy a new model as the default. It is assumed that the model estimator and preprocessor files are located in `/preprocessing/models/` and are named like so:

* `model#-preprocessor.js`
* `model#-estimator.js`

where '`#`' is the model number.

1. In `/preprocessing/lib/cli-common.js` there is a global variable called `DEFAULT_MODEL` which should be set to a string like so `model#` *(note: there is no dash here)*

2. Next use the following commands in a terminal to deploy the new default to the UI.

  * `cd preprocessing/cli`
  * `node produce-aggregate-data-files.js -o ../../docs`
