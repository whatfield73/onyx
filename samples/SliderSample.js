enyo.kind({
	name: "onyx.sample.SliderSample",
	classes: "onyx onyx-sample",
	components: [
		{classes: "onyx-sample-divider", content: "Sliders"},
		{kind: "onyx.Slider", value: 50, onChanging:"sliderChanging", onChange:"sliderChanged"},
		{tag: "br"},
		{kind: "onyx.Slider", lockBar: false, value: 50, onChanging:"sliderChanging", onChange:"sliderChanged"},
		
		{tag: "br"},
		{kind: "onyx.InputDecorator", style:"margin-right:10px;", components: [
			{kind: "onyx.Input", placeholder: "Value", style:"width:50px;"}
		]},
		{kind: "onyx.Button", content:"Set", classes:"onyx-sample-spaced-button", ontap:"changeValue"},
		{kind: "onyx.Button", content:"-", classes:"onyx-sample-spaced-button", ontap:"decValue"},
		{kind: "onyx.Button", content:"+", classes:"onyx-sample-spaced-button", ontap:"incValue"},
		{tag: "br"},
		{tag: "br"},
		{kind: "onyx.Checkbox", name:"animateSetting", value:true},
		{content:"Animated", classes:"enyo-inline onyx-sample-animate-label"},
		{tag: "br"},
		{tag: "br"},
		{kind: "onyx.Groupbox", classes:"onyx-sample-result-box", components: [
			{kind: "onyx.GroupboxHeader", content: "Result"},
			{name:"result", classes:"onyx-sample-result", content:"No slider moved yet."}
		]},
		{tag: "br"},
		{tag: "br"},
		{tag: "br"},
		{classes: "onyx-sample-divider", content: "RangeSlider"},
		{tag: "br"},
		{kind: "onyx.RangeSlider", rangeMin: 100, rangeMax: 500, rangeStart: 200, rangeEnd: 400, increment: 20, showLabels: true, onChanging: "rangeSliderChanging", onChange: "rangeSliderChanged"},
		{components: [
			{style: "width:20%; display:inline-block; text-align:left;", content: "$100"},
			{style: "width:60%; display:inline-block; text-align:center;", content: "$300"},
			{style: "width:20%; display:inline-block; text-align:right;", content: "$500"}
		]},
		{tag: "br"},
		{kind: "onyx.Checkbox", onchange: "incrementChanged", checked: true},
		{content: "increment by 20", classes:"enyo-inline"},
		{tag: "br"},
		{tag: "br"},
		{kind: "onyx.Groupbox", classes:"onyx-sample-result-box", components: [
			{kind: "onyx.GroupboxHeader", content: "Result"},
			{name:"rangeSliderResult", classes:"onyx-sample-result", content:"RangeSlider not moved yet."}
		]}
	],
	changeValue: function(inSender, inEvent) {
		for (var i in this.$) {
			if (this.$[i].kind == "onyx.Slider") {
				if (this.$.animateSetting.getValue()) {
					this.$[i].animateTo(this.$.input.getValue());
				} else {
					this.$[i].setValue(this.$.input.getValue());
				}
			}
		}
	},
	incValue: function() {
		this.$.input.setValue(Math.min(parseInt(this.$.input.getValue() || 0, 10) + 10, 100));
		this.changeValue();
	},
	decValue: function() {
		this.$.input.setValue(Math.max(parseInt(this.$.input.getValue() || 0, 10) - 10, 0));
		this.changeValue();
	},
	sliderChanging: function(inSender, inEvent) {
		this.$.result.setContent(inSender.name + " changing: " + Math.round(inSender.getValue()));
	},
	sliderChanged: function(inSender, inEvent) {
		this.$.result.setContent(inSender.name + " changed to " + Math.round(inSender.getValue()) + ".");
	},
	incrementChanged: function(inSender, inEvent) {
		if (inSender.getValue()) {
			this.$.rangeSlider.setIncrement(20);
		} else {
			this.$.rangeSlider.setIncrement(0);
		}
	},
	updateRangeLabels: function(slider) {
		slider.setStartLabel("--> " + slider.getRangeStart());
		slider.setEndLabel(slider.getRangeEnd() + "<--");
	},
	rangeSliderChanging: function(inSender, inEvent) {
		this.updateRangeLabels(inSender);
		this.$.rangeSliderResult.setContent("Range changing: $" + Math.round(inSender.getRangeStart()) + " - $" + Math.round(inSender.getRangeEnd()));
	},
	rangeSliderChanged: function(inSender, inEvent) {
		this.updateRangeLabels(inSender);
		this.$.rangeSliderResult.setContent("Range changed to $" + Math.round(inSender.getRangeStart()) + " - $" + Math.round(inSender.getRangeEnd()) + ".");
	},
	create: function() {
		this.inherited(arguments);
		this.updateRangeLabels(this.$.rangeSlider);
	}
});
