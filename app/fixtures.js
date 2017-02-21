import utils from './Utils';

const seasons = {
    "2015" : "https://spreadsheets.google.com/feeds/list/1Le0TL0SajUKWyqnzSQuRyu4c-ACdoQR9FV_YXPLtOsw/1/public/basic?alt=json",
    "2016" : "https://spreadsheets.google.com/feeds/list/1rs8faeR-UcxqzHZWIKBmbRQv3Kqm4yn_Rqolle_yyKs/1/public/basic?alt=json",
    "2017" : "https://spreadsheets.google.com/feeds/list/1zenOgULKD5fIAoBwanHjrrSCDvU7MHh4Aj7v47Xbboc/1/public/basic?alt=json"
};

export default class fixtures {
    constructor() {
    
    }

	init() {
        utils.byId('seasons-list').addEventListener('click', 
        (e) => {
            if (e.target.matches('.seasons-select')) {
                let season = e.target.id.split('-')[1];
                utils.byId('season-selected').innerHTML = 'Season ' + season;
                e.preventDefault();
                this.getFixtureData(season); 
            }
        });
        utils.byId('toUpcoming').addEventListener('click', 
            utils.tabUI(utils.byId('fixturesInnerCol'), utils.byId('fixturesList')));

        utils.byId('toResults').addEventListener('click', 
            utils.tabUI(utils.byId('fixturesInnerCol'), utils.byId('resultsList')));    

	};

    renderFixtures(data, filterfn, template, noStr, containerId, sortfn) {
        data = data.filter(filterfn);
        if (sortfn)
            data.sort(sortfn);

        let fixtureContainer = utils.byId(containerId);
        fixtureContainer.innerHTML = '';
        fixtureContainer.innerHTML =  data.length > 0 ? 
            template({'match' : data}) : noStr ;
    }
	
	renderFormattedData (formatedData) {
        let template = Handlebars.compile(utils.byId("upcoming-matches").innerHTML);
		this.renderFixtures(
                formatedData,
                v => v.result ? false : true, 
                template,
                "<div class='noresults col-sm-12'><p><b>No Upcoming matches yet</b></p></div>",
                'fixturesList');
        this.renderFixtures(
                formatedData,
                v => v.result ? true : false, 
                template,
                "<div class='noresults col-sm-12'><p><b>No Results yet</b></p></div>",
                'resultsList',
                (a,b) => new Date(b.date) - new Date(a.date));                
	};
	
	getFixtureData(season) {
		var context = this;
		var link = seasons[season];
		$.ajax({
			url : link, 
			success : (data) => {
				var formatedData = [];
				for(let i = 0 ; i < data.feed.entry.length; i++) {
				   let rowCols = data.feed.entry[i].content.$t.split(',');
				   let _data = {};
				   for(let j = 0; j < rowCols.length; j++) {
					   let item = rowCols[j].trim();
					   let index = item.indexOf(':');
					   _data[item.substring(0,index)] = item.substring(index+1).trim();
				   }
                   _data.practice = _data.tournament === 'Practice Session';
				   formatedData.push(_data);
				}
				this.renderFormattedData(formatedData);
			}
		});
	};
}