(function($) {
	/**
	 * @desc jQuery弹窗插件，提供常用的弹窗操作。
	 * @version 1.0.0
	 * @author maixingjie
	 * @copyright Copyright 2014-2015
	 * 
	 */
	if($){
		
		/** 
		 * @desc jQuery的popupOpen插件，用于打开蒙板浮层
		 * @param {Object} [options] 可选，弹窗选项
		 * @param {Function} [options.callback] 执行成功后，回调函数。且会传入当前 jQuery 对象作为参数
		 * @param {Integer} [options.speed] 显示速度，单位ms，默认100
		 * @param {boolean} [options.mask] 是否打开蒙层，默认 true
		 * @param {String} [options.maskColor] 蒙层颜色，默认#666
		 * @param {String} [options.maskOpacity] 蒙层透明度，默认0.6
		 * @return {Object} 返回当前jQuery包装对象
		 */
		$.fn.popupOpen = function(options) {	
			var opts = $.extend({
				speed : 100,
				maskColor : '#111',
				maskOpacity : '0.9'
			},options||{});
			var callback = (opts.callback || function(){}),
				mask = (opts.mask === undefined ? true : opts.mask),
				d = document,
				w = $(this).width(),
				h = $(this).height() + parseInt($(this).css('padding-top')),
				st = Math.max(d.documentElement.scrollTop , d.body.scrollTop), 
				sl = d.documentElement.scrollLeft,
				vP = $.getViewSize(),
				vW = vP.width,
				vH = vP.height,
				left = (vW - w) / 2 + sl,
				top = (vH - h) / 2 + st;
				
			if (mask){
				$.showCover({
					style : {
						'background': opts.maskColor,
						'opacity' : opts.maskOpacity
					}
				});
			}
			
			if(vH < h){
				$(this).css({top: (top > 0 ? (vH > h ? top : top - (h - vH)/2) : 0) + 'px', left: left + 'px', position: 'absolute','margin-top':'0px','margin-left':'0px'});
			}else{
				$(this).css({top:'50%', left:'50%', position: 'fixed','filter':'inherit','margin-left':-parseInt(w/2)+'px','margin-top':-parseInt(h/2)+'px'});
			}
			$(this).fadeIn(opts.speed);
			callback($(this));
			return $(this);
		};
		
		/**
		 * @desc jQuery的popupClose插件，关闭蒙板浮层
		 * @param {Function} callback 执行成功后，回调函数。且会传入当前 jQuery 对象作为参数
		 * @param {Boolean} bool 是否关闭蒙层，默认 true
		 * @return {Object} 返回当前jQuery包装对象
		 */
		$.fn.popupClose = function(options) {
			var opts = $.extend({},options||{});
			var callback =(opts.callback || function(){}),
				mask = (opts.mask === undefined ? true : opts.mask);	
				
			$(this).fadeOut(100);
			if (mask) $.hideCover();
			callback($(this));
			return $(this);
		};			
		
		$.extend({
			/**
			 * @desc jQuery静态方法扩展，创建并展示蒙层
			 * @param {Object} [options] 可选，蒙层参数
			 * @param {string} [options.id]  可选，蒙层 id，默认为 'xl_jqfn_cover‘
			 * @param {Object} [options.styles]  可选，蒙层样式json集合，用于修改默认样式，如：{'background': '#CCCCCC', 'z-index': 1000}
			 * @static
			 */
			showCover : function(options) {
				var opts = {
					id : 'xl_jqfn_cover'
				}
				$.extend(opts,options||{});
				var d = document,
					pageSize = $.getPageSize(),
					w = pageSize.width, 
					h = pageSize.height, 
					conid = $('#' + opts.id),
					css = {
						background:'#000000', 
						filter:'alpha(opacity=50)', 
						'-moz-opacity':0.5, 
						opacity:0.5, 
						position:'fixed', 
						left:0, 
						top:0,
						bottom:0,
						right:0,
						'z-index':900,
						/*width:w+'px',
						height:h+'px',*/
						border: 'none'
					};
				$.extend(css,opts.style||{});
				if (!conid[0]) {	
					div = $('<div id="'+opts.id+'" style="opacity:0.6;"></div>');
					div.css(css);
					$(d.body).append(div);
					covid = $('#' + opts.id);
					covid.show();
				}else{
					$('#'+opts.id).css(css).css({'height': h+'px', width: w+'px'}).show();
				}
			},
			/**
			 * @desc jQuery静态方法扩展，隐藏遮罩层
			 * @param {object} options 选填，遮罩层选项，暂时仅支持id
			 * @param {string} [options.id]  可选，蒙层 id，默认为 'xl_jqfn_cover‘
			 * @static
			 */
			hideCover : function(options) {
				var opts = {
					id : 'xl_jqfn_cover'
				}
				$.extend(opts,options||{});
				$('#' + opts.id).hide();
			},
			/**
			 * @desc 获取视口宽高（这里的宽度和高度不包括菜单栏、工具栏以及滚动条等的高度）
			 * @returns {object} 显示区宽高对象如：{width: 1400, height: 900}
			 * @static
			 */
			getViewSize : function(){
				var w = 0, h = 0, o, d = document;
				if (window.innerWidth) {	
					o = window;		
					w = o.innerWidth;
					h = o.innerHeight;
				} else if (d.documentElement && d.documentElement.clientWidth) {
					o = d.documentElement;
					w = o.clientWidth;
					h = o.clientHeight;
				}
				return {width: w, height: h};
			},
			/**
			 * @desc 获取整个页面的宽高
			 * @return {object} 包含宽高的 JSON 对象集合,如：{width: 1400, height: 900}
			 * @static
			 */
			getPageSize : function(){
				var _doc = document,
					_docElem = _doc.documentElement,
					_body = _doc.body,
					cw, sw, bw, ch, sh, bh, w, h;
					
				cw = _docElem.clientWidth;
				sw = _docElem.scrollWidth;
				bw = _body.scrollWidth;
				ch = _docElem.clientHeight;
				sh = _docElem.scrollHeight;
				bh = _body.scrollHeight;
				w = Math.max(cw, sw, bw);
				h = Math.max(ch, sh, bh);	
				return {width: w, height: h};
			}
		});
	}

})(jQuery);
