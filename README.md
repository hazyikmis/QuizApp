Accessible from https://hazyikmis.github.io/QuizApp/

Creating app:

> npx create-react-app quiz-app --template typescript

> npm i styled-components @types/styled-components

OPEN TRIVIA (https://opentdb.com/api_config.php) used for querying ad hoc questions

# How to deploy Github Pages (gh-pages):

Install the gh-pages package as a "dev-dependency"

> npm install gh-pages --save-dev

Add homepage property to package.json http://{username}.github.io/{repo-name}

> "homepage": "http://hazyikmis.github.io/QuizApp"

Deploy script (deploy + predeploy)

"scripts": {
//...
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
}

Finally

> npm run deploy
