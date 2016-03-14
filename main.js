console.log(Backbone)

//---------Models----------//

var IphyModel = Backbone.Model.extend ({

	_api_key: 'dc6zaTOxFJmzC',
	url: 	"http://api.giphy.com/v1/gifs/search"
})



//---------Views----------//

var ScrollView = Backbone.View.extend ({ 
	el: "#container",
	initialize: function(someModel) {
		this.model = someModel
		this.model.on("sync", this._render.bind(this))
	},

	events: {
		"click img": "_triggerDetailView"
	},

	_triggerDetailView: function(clickEvent) {
		var imgNode = clickEvent.target
		console.log(clickEvent.target)
		location.hash = "detail/" + imgNode.getAttribute("gifid")
	},

	_render: function() {
		console.log(this.model)
		var dataArray = this.model.attributes.data
		var gifUrlString = ""
		for (var i = 0; i < dataArray.length; i++) {
			var gifObject = dataArray[i]
			gifUrlString += "<img gifid='" + gifObject.id + "class='gifScroll' src='" + gifObject.images.original.url + "'>"
		}
		this.el.innerHTML = gifUrlString
	}
})


//----------Router----------//
var IphyRouter = Backbone.Router.extend ({
	routes: {
		"scroll/:query": "handleScrollView",
		"detail/:id": "handleDetailView"
	},

	handleScrollView: function(query) {
		var modInstance = new IphyModel()
		var nv = new ScrollView(modInstance)
		var promise = modInstance.fetch({
			// dataType:'jsonp',
			data:{
				q:query,
				api_key: modInstance._api_key
				// callback: '?'
			}
		})
		promise.then(nv._render.bind(nv))
	},

	handleDetailView: function(id) {

	},

	initialize: function() {
		Backbone.history.start()
	}

})

new IphyRouter()