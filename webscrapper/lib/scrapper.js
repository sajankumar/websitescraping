let req = require('request');
let dom = require('cheerio');
let _ = require('lodash');

/**
 * name: Scrape 
 * constructor param: { $ } 
 * methods: getTitle(), getHeadings(), getHtmlVersion(), getLinks(), getLoginForm()
 */
class Scrape {
    constructor($) {
        this.domElements = $;
    }

    /* returns a String */
    getTitle() {
        return this.domElements('title').text();
    }

    /* retuns an array of heading levels */
    getHeadings() {
        let headings =  this.domElements(':header').toArray();
        let temp = [];
        if(headings.length > 0) {
            _.each(headings, function (value, key) {
                temp.push(value.name);
            });
        }
        return temp;
    }
    
    /* retuns a String */
    getHtmlVersion() {
        let version = '';
        let document = this.domElements.root().toArray()[0];
        if(document.children && document.children.length > 0) {
            _.each(document.children, function (value, index) {
                if(value.data !== null || value.data !== undefined) {
                    if(String(value.data).toLowerCase() === "!doctype html") {
                        version = 'HTML 5';   
                    }
                    if(/xhtml 1.0/g.test(String(value.data).toLowerCase())) {
                        version = 'XHTML 1.0';
                    }
                    if(/html 4.01/g.test(String(value.data).toLowerCase())) {
                        version = 'HTML 4.01';
                    }
                }
            });
        }
        return version;
    }
    
    /* returns a Object */
    getLoginForm() {
        let form = this.domElements('form').attr();
        let formObject = {
            isLoginForm: false,
            details: {}
        };
        if(_.has(form, 'action')) {
            if(/login/g.test(form.action) || /login/g.test(form.id)) {
                formObject.isLoginForm = true;
                formObject.details = form;
            }
        }
        return formObject;
    }

    /* returns a Object */
    getLinks() {
        let links = this.domElements('a').toArray();
        let linkTypes = {
            'internalLinks': [],
            'externalLinks': [],
            'inaccessableLinks': []
        };
        if(links.length > 0) {
            _.each(links, function (value, index) {
                if(/https|http/g.test(value.attribs['href'])) {
                    linkTypes.externalLinks.push(value.attribs['href']);
                }else if(/#/g.test(value.attribs['href'])) {
                    linkTypes.inaccessableLinks.push(value.attribs['href']);
                }else {
                    linkTypes.internalLinks.push(value.attribs['href']);
                }
            });
        }
        return linkTypes;
    }
}

/**
 * class name: WebScrapper
 * constructor 
 * methods: scrapper @params: {url String, callback Function} 
 */
class WebScrapper { 
    constructor() {}
    scrapper(url, callback) {
       let urlString = 'http://www.'+url;
       let output = {
        'verison': '',
        'title': '',
        'heading': [],
        'links': {},
        'login': {} 
        };
        req(urlString, function (err, response) {
            if(!err && response.statusCode === 200) {
                let $ = dom.load(response.body);
                let scrap = new Scrape($);
                output.verison = scrap.getHtmlVersion();
                output.title = scrap.getTitle();
                output.heading = scrap.getHeadings();
                output.links = scrap.getLinks();
                output.login = scrap.getLoginForm();
                callback(null,output);
            }else {
                let errorObject = {
                    statusCode: (_.has(response, 'statusCode')) ? response.statusCode : 404,
                    errorMessage: (_.has(response, 'body')) ? response.body : err
                }
                callback(errorObject, null);
            }
       });
    }
}
module.exports = new WebScrapper();