import utils from './Utils';

const sheets = [
    {
        'container' : 'players',
        'link' : 'https://spreadsheets.google.com/feeds/list/1dPbsHsdSgQo4rUnxg-rzfYmy0w17vTJttHZ4PRMs3Uc/1/public/basic?alt=json' 
    },
    {
        'container' : 'admin',
        'link' : 'https://spreadsheets.google.com/feeds/list/1J3qnqDHtNXsQBYCjhkW9mRyIxwdiIjypAkZKr8Sxsos/1/public/basic?alt=json'
    }
];

export default class people {
    constructor() {

    }

    init() {
        let template = Handlebars.compile(utils.byId("entry-template").innerHTML);
        sheets.forEach((el) => {
            this.getData(el.link, utils.byId(el.container), template);
        });

        utils.byId('toPlayers').addEventListener('click', 
            utils.tabUI(utils.byId('playersContainer'), utils.byId('players')));

        utils.byId('toManagement').addEventListener('click', 
            utils.tabUI(utils.byId('playersContainer'), utils.byId('admin')));        
    }

    getData(url, container, template) {
		return $.ajax({
			url : url, 
			success : (data) => {
				let players = data.feed.entry.map((el) => {
                    let rowCols = el.content.$t.split(',');
                    return {
                        'name' : rowCols[0].split(":")[1],
                        'image': rowCols[1].split(":")[1].trim(),
                        'description' : rowCols[2].split(":")[1],
                        'url': rowCols.length === 4 ? rowCols[3].trim().split("url:")[1] : ''
                    };
                });
				container.innerHTML = template({"entry" : players});
			}
		}); 
    }
}