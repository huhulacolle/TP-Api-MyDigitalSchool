# Requis
- NodeJS
- MongoDB (Docker ou Local)

# Installation et lancement
## Back End :
```
cd Back
```
```
npm install 
```
crée un fichier .env en se basant sur le fichier .env.example
```
npm start
```

## Front End (mode dev) :
```
cd Front
```
```
npm install 
```
```
npm start
```
Si le front ne se lance pas :
```
npm install -g @angular/cli
```
```
cd Front
```
```
npm install 
```
```
ng serve --open
```
Il est possible que la commande "ng serve --open" ne fonctionne pas sur Windows, pour ça : exécutez la commande suivante dans un terminal PowerShell en mode administrateur 
```
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```
puis relancer la commande ng serve