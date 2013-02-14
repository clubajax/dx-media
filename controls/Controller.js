define([
	'dojo/_base/declare',
	'../mobile/common',
	'dx-alias/has',
	'dx-alias/Widget',
	'../util/dom',
	'dx-alias/on',
	'dx-alias/lang',
	'dx-alias/log',
	'dx-timer/timer'
],function(declare, mobile, has, Widget, dom, on, lang, logger, timer){
	//	summary:
	//		The controller that wires a set of controls (controls/Controlbar)
	//		to a video renderer.
	//	TODO:
	//		Handle multiple video renderers (playlist).
	//		Handle Slideshow and Vtour
	//
	//
	var log = logger('VC', 0);

	var isMobile = has('mobile');

	return declare('dx-media.controls.Controller', [Widget], {

		controls:null,
		video:null,
		preview:null,
		screenButton:null,

		slideshow:null,
		vtour:null,

		isFullscreen:false,

		postCreate: function(){
			this.displayElements = [];
			//this.id = lang.uid('VideoControl');
			timer(this, 'startup', 1);
		},

		startup: function(){
			if(this._started) { return; }
			this._started = 1;

			this._connections = [];
			['controls', 'video', 'preview', 'screenButton', 'slideshow', 'vtour'].forEach(function(str){
				this[str] = this.getObject(str);
				log('   get', str, 'got', this[str]);
				if(this[str]) { this.displayElements.push(this[str]); }
			}, this);

			log('controls:', this.controls);
			log('controller', this);

			this.map = {};
			this.buttons = [];
			if(this.controls){
				this.buttons = this.controls.getChildren();
				//log('BUTTONS', this.buttons);
				this.buttons.forEach(function(w){
					log('   button:', w.getName());
					this.map[w.controlType] = w;
				}, this);
				this.controls.startup();
			}

			this.init();

			if(isMobile){
				this.own(on(mobile, 'updateOrient', this, 'resize'));
			}else{
				this.sub('/dojox/mobile/screenSize/tablet', this, 'resize');
				this.own(on(window, 'resize', this, 'resize'));
			}

			if(this.video){
				this.video.startup();
			}
			if(this.screenButton){
				this.screenButton.startup();
			}
			if(this.preview){
				this.preview.startup();
			}

			this.showVideo();

			this.resize();
		},



		init: function(){

			if(!this.video || !this.controls){
				console.error('Controller must be associated with a Video and a Controlbar.');
				return;
			}
			if(this.inited) { return; } this.inited = 1;

			this.parentNode = /*isMobile ? window : */this.controls.domNode.parentNode;

			if(this.map.Play){
				this.video.on('play', this.map.Play, 'showPause');
				this.video.on('pause', this.map.Play, 'showPlay');
				this.map.Play.on('play', this.video, 'play');
				this.map.Play.on('pause', this.video, 'pause');

				//this.video.on('play', function(){
				//		console.warn('CTR VIDEO PLAY');
				//});
				//this.video.on('play', function(){
				//		console.warn('CTR VIDEO ONPLAY');
				//});
				//this.video.on('progress', function(){
				//		console.warn('CTR VIDEO PROGRESS');
				//});
			}

			if(this.map.Volume){
				this.map.Volume.on('update', this.video, 'volume');
			}

			if(this.map.Progress){
				this.map.Progress.on('update', this, function(evt){
					this.video.seek(evt);
				});
				this.video.on('progress', this.map.Progress, 'update');
			}else{
				console.warn('********************************NO PROGRESS BAR');
			}

			if(this.map.Duration){
				this.video.on('meta', this.map.Duration, 'update');
				this.video.on('progress', this.map.Duration, 'update');
			}

			if(this.map.Time){
				this.video.on('progress', this.map.Time, 'update');
			}

			if(this.map.Fullscreen){
				// http://hacks.mozilla.org/2012/01/using-the-fullscreen-api-in-web-browsers/
				var node = this.parentNode;

				if(node.requestFullScreen){
					on(document, 'fullscreenchange', this, 'onFullscreen');
					this.fullscreen = function(){
						if(this.isFullscreen){
							document.exitFullscreen();
						}else{
							node.requestFullscreen();
						}

					};
				}else if(node.mozRequestFullScreen) {
					on(document, 'mozfullscreenchange', this, 'onFullscreen');
					this.fullscreen = function(){
						if(this.isFullscreen){
							document.mozCancelFullScreen();
						}else{
							node.mozRequestFullScreen();
						}
					};
				}else if(node.webkitRequestFullScreen){
					on(document, 'webkitfullscreenchange', this, 'onFullscreen');
					this.fullscreen = function(){
						if(this.isFullscreen){
							document.webkitCancelFullScreen();
						}else{
							node.webkitRequestFullScreen();
						}
					};
				}

				if(!!this.fullscreen){
					this.video.removeFullscreen();
					this.map.Fullscreen.on('click', this, function(){
						log('------------------------------- Fullscreen', this.video.renderer);
						this.fullscreen();

					});
				}else{
					this.map.Fullscreen.destroy();
				}
			}

			if(this.screenButton){
				this.screenButton.on('click', this.video, 'play');
				this.video.on('play', this.screenButton, 'hide');
				var self = this;
				this.screenButton.on('click', function(){
					console.warn('this.screenButton CLICK');
					//self.preview.hide();
				});
			}

			if(this.preview){
				this.video.on('play', this.preview, 'hide');
			}


			// These are buttons, not components
			if(this.map.Video){
				this.map.Video.on('click', this, 'showVideo');
			}
			if(this.map.Slideshow){
				this.map.Slideshow.on('click', this, 'showSlideshow');
			}
			if(this.map.Vtour){
				this.map.Vtour.on('click', this, 'showVtour');
			}

			log('mapped');
		},

		// FIxme~~~!!!!
		hideComponents: function(){
			//if(this.video) { this.video.hide(); }
			if(this.slideshow) { this.slideshow.hide(); }
			if(this.vtour) { this.vtour.hide(); }
			if(this.preview) { this.preview.hide(); }
			if(this.screenButton) { this.screenButton.hide(); }
		},

		showVideo: function(){
			this.hideComponents();
			this.video.show();
			if(this.preview) { this.preview.show(); }
			if(this.screenButton) { this.screenButton.show(); }
		},
		showVtour: function(){
			log('Vtour click');
			this.hideComponents();
			this.vtour.show();
		},
		showSlideshow: function(){
			log('Slideshow click');
			this.hideComponents();
			this.slideshow.show();
		},

		onFullscreen: function(evt){
			// http://hacks.mozilla.org/2012/01/using-the-fullscreen-api-in-web-browsers/

			this.isFullscreen = !this.isFullscreen;
			log('onFullscreen', evt);
			this.resize();
		},

		resize: function(){
			if(!this.parentNode){ return; }
			var box = dom.box(this.parentNode);
			log('resize:', box.w, box.h);
			box.isFullscreen = this.isFullscreen;
			this.displayElements.forEach(function(el){
				if(el.resize) { el.resize(box); }
			}, this);
			mobile.hideAddressBar();
		},

		getScreenSize: function(){
			// summary:
			//		Returns the dimensions of the browser window.
			return {
				h: window.innerHeight || document.documentElement.clientHeight,
				w: window.innerWidth || document.documentElement.clientWidth
			};
		}


	});
});
