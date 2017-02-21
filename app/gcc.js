import fixtures from './fixtures';
import people from './people'
import utils from './Utils';

utils.ready((e) => {
	new fixtures().init();
	new people().init();
	utils.triggerClick(utils.byId('season-2017'));
	var postsTemplate = Handlebars.compile(utils.byId('blog-posts').innerHTML);
	$.ajax({
		'url' : '/news.json',
		'dataType': 'json',
		success: function(data) {
			console.log(data);
			let div = utils.createElement('div');
			div.innerHTML = postsTemplate({"entry" : data.item}); 
			utils.byId('blogsCol').appendChild(div);
		}
	});
});