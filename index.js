'use strict';

//displays results on the dom.
function displayResults(responseJson) {
    console.log(responseJson)
    console.log(responseJson.length)
    console.log(responseJson[0].owner.login)
    //Finds username, displays it on the dom.
    let user = responseJson[0].owner.login
    let userinfo = `
        <h4>User: <span class="user">${user}</span></h4>
        <h4><span class="user">Repos: ${responseJson.length}</span></h4>
        <ul class="results-list"></ul>
    `
    //Makes list of repos/info.
    $('.js-results').append(userinfo)
    for (let i = 0; i < responseJson.length; i++) {
        $('.js-results').append(`
        <div class="result-item"><li><h4>${responseJson[i].name}</h4>
        <a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a>
        <p>${responseJson[i].description}</p>
        </li></div>
        `)
    }
    //modifies display hidden.
    $('.js-results').removeClass('hidden')

}

//Fetches data, converts then parses it to display.
function getRepos(username) {
    const url = `https://api.github.com/users/${username}/repos`
    console.log(url);
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            displayError(err.message);
        });
}

//displays error in dom
function displayError(error) {
    $('.js-results').html(`<h3 class="error">Something went wrong: ${error}</h3>`)
    $('.js-results').removeClass('hidden')
}

function watchForm() {
    $('#jsForm').submit(event => {
        event.preventDefault();
        $('.js-results').empty().addClass('hidden')
        const username = $('.js-username').val();
        console.log(username);
        setTimeout(function () {
            getRepos(username);
        }, 1000)
    });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});