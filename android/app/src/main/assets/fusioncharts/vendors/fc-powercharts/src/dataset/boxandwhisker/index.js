import ColumnDataset from'../../../../fc-charts/src/dataset/column';import LineDataset from'./boxandwhiskerline';import{pluck,pluckNumber,toRaphaelColor,parseConfiguration,HUNDREDSTRING,parseUnsafeString,parseTooltext,getDashStyle,getDefinedColor,BLANKSTRING,preDefStr,COMMASTRING,COMMA,getValidValue,POSITION_LEFT,POSITION_MIDDLE,visibleStr,defined,getFirstValue,datasetFactory,getSuggestiveRotation,convertColor,getLightColor,getColumnColor,getFirstAlpha,getFirstColor}from'../../../../fc-core/src/lib';import{addDep}from'../../../../fc-core/src/dependency-manager';import boxandwhisker2dAnimation from'./index.animation';let UNDEFINED,PLOTBORDERCOLOR='plotBorderColor',PLOTGRADIENTCOLOR='plotGradientColor',SHOWSHADOW='showShadow',SETROLLOVERATTR='setRolloverAttr',SETROLLOUTATTR='setRolloutAttr',colorStrings=preDefStr.colors,COLOR_000000=colorStrings.c000000,LABEL=preDefStr.LABEL,ROLLOVER='DataPlotRollOver',ROLLOUT='DataPlotRollOut',UNDERSCORE=preDefStr.UNDERSCORE,POINTER=preDefStr.POINTER,BLANK=preDefStr.BLANK,ROUND=preDefStr.ROUND,GROUPID=preDefStr.GROUPID,POSITION_START=preDefStr.POSITION_START,POSITION_BOTTOM=preDefStr.POSITION_BOTTOM,POSITION_TOP=preDefStr.POSITION_TOP,showHoverEffectStr=preDefStr.showHoverEffectStr,EVENTARGS=preDefStr.EVENTARGS,POSITION_END=preDefStr.POSITION_END,M='M',H='H',V='V',BOLDSTARTTAG='<b>',BOLDENDTAG='</b>',BREAKSTRING='<br />',MAXIMUM_STR='Maximum',Q3_STR='Q3',MEDIAN_STR='Median',Q1_STR='Q1',MINIMUM_STR='Minimum',pStr=preDefStr.pStr,sStr=preDefStr.sStr,NONE='none',createChildIndices=function(e,o){let r=[];for(;o;)r.unshift(e+ +('.'+o)),o--;return r},createGroup=function(e,o,r){var a=r.getFromEnv('animationManager');return a.setAnimation({el:'group',attr:e,container:o,component:r,label:'group'})},_hide=function(){return function(){this.hide()}};addDep({name:'boxandwhisker2dAnimation',type:'animationRule',extension:boxandwhisker2dAnimation});class BoxAndWhiskerDataset extends ColumnDataset{createContainer(){var e,o,r=this,a=r.type,l=r.groupName,t=r.getLinkedParent(),i=l||r.dsGroup||a;t.getChildContainer(i+'VcanvasGroup')||(i='default'),e=t.getChildContainer(i+'VcanvasGroup'),o=t.getChildContainer(i+'ShadowVcanvasGroup'),r.getContainer('shadowGroup')||r.addContainer('shadowGroup',createGroup({name:'shadow-group'},o,r)),r.getContainer('commonElemsGroup')||r.addContainer('lowerBoxGroup',createGroup({name:'lower-box-group'},e,r)),r.getContainer('commonElemsGroup')||r.addContainer('upperBoxGroup',createGroup({name:'upper-box-group'},e,r)),r.getContainer('commonElemsGroup')||r.addContainer('upperWhiskerGroup',createGroup({name:'upper-whisker-group'},e,r)),r.getContainer('commonElemsGroup')||r.addContainer('lowerWhiskerGroup',createGroup({name:'lower-whisker-group'},e,r)),r.getContainer('commonElemsGroup')||r.addContainer('medianGroup',createGroup({name:'median-group'},e,r)),r.getContainer('labelGroup')||r.addContainer('labelGroup',createGroup({name:'label-group',class:'fusioncharts-datalabels'},t.getChildContainer('vcanvasLabelGroup'),r))}configureAttributes(e){var o=Math.max,r=Math.min;if(!e)return!1;this.trimData(e),this.config.JSONData=e;var a,l,t,s,n,p,d,h,u,c,b,m,w,g,x,v,k,B,f,C,A,E,L,y,T,S,W,q,V,Q,D,R,O,M,P,G,F,N,I,U,H,_,J,j,z,K,X,Y,Z,$,ee,oe,re,ae,le,te,ie,se,ne,pe,de,he,ue,ce,be,me,we,ge,xe,ve,ke,Be,fe=this,Ce=fe.config,Ae=fe.config.JSONData,Ee=Ae.data,Le=Ee&&Ee.length,ye=fe.getFromEnv('chartConfig'),Te=fe.getFromEnv('xAxis'),Se=Te.getTicksLen(),We=r(Se,Le),qe=fe.getFromEnv('chart-attrib'),Ve=fe.getFromEnv('color-manager'),Qe=Ce.index,De=Ce.plotColor=Ve.getPlotColor(Qe),Re=pluckNumber(Ae.dashed,qe.plotborderdashed),Oe=ye.useplotgradientcolor,Me=ye.yaxisname,Pe=ye.xaxisname,Ge=parseUnsafeString(pluck(qe.tooltipsepchar,': ')),Fe=fe.components.data,Ne=fe.getFromEnv('number-formatter'),Ie=-Infinity,Ue=+Infinity,He=fe.getFromEnv('BoxAndWhiskerStatisticalCalc');for(fe.setState('visible',1===pluckNumber(fe.config.JSONData.visible,!+fe.config.JSONData.initiallyhidden,1)),parseConfiguration(Ae,Ce,ye,{data:!0}),Ce.defaultPadding={left:.5,right:.5},Ce.seriesname=parseUnsafeString(Ae.seriesname),Ce.includeInLegend=pluckNumber(Ae.includeinlegend,Ce.seriesname?1:0),Ce.legendSymbolColor=Ce.plotColor,a=Ce.showplotborder,u=Ce.plotborderdashlen,c=Ce.plotborderdashgap,x=Ce.plotfillalpha,m=Ce.useroundedges,v=Ce.ratio,b=Ce.plotborderthickness,ge=Ce.showvalues=pluckNumber(Ae.showvalues,qe.showvalues,1),l=Ce.showtooltip,Ce.rotatevalues&&(Ce.rotatevalues=270),xe=Ce.showalloutliers,Ce.plotfillAngle=g=pluckNumber(360-qe.plotfillangle,90),Ce.plotColor=De=pluck(Ae.color,De),Ce.plotRadius=pluckNumber(qe.useroundedges,m?1:0),Ce.plotgradientcolor=k=getDefinedColor(qe.plotgradientcolor,Ve.getColor(PLOTGRADIENTCOLOR)),Oe||(k=BLANKSTRING),Ce.plotBorderAlpha=B=a?pluck(qe.plotborderalpha,x,HUNDREDSTRING):0,Ce.plotBorderColor=f=pluck(qe.plotbordercolor,Ve.getColor(PLOTBORDERCOLOR)),Ce.plotBorderDashStyle=C=Re?getDashStyle(u,c,b):NONE,Ce.showShadow=m?pluckNumber(qe.showshadow,1):pluckNumber(qe.showshadow,Ve.getColor(SHOWSHADOW)),Ce.showHoverEffect=w=pluckNumber(qe.plothovereffect,qe.showhovereffect,UNDEFINED),Ce.parentYAxis=X=pluck(Ae.parentyaxis&&Ae.parentyaxis.toLowerCase(),pStr)===sStr?1:0,Ce.dataSeparator=COMMASTRING,Ce.textDirection='1'===qe.hasrtltext?'rtl':BLANKSTRING,Ce.showMeanLegend=Ce.showSDLegend=Ce.showMDLegend=Ce.showQDLegend=Ce.showOutliersLegend=0,fe.components.data||(fe.components.data=[]),Fe=fe.components.data,Ce.upperBoxColor=ue=pluck(Ae.upperboxcolor,qe.upperboxcolor,Ve.getPlotColor(2*Qe)),ce=Ce.upperBoxAlpha=pluck(Ae.upperboxalpha,qe.upperboxalpha,x,HUNDREDSTRING),Ce.lowerBoxColor=be=pluck(Ae.lowerboxcolor,qe.lowerboxcolor,Ve.getPlotColor(2*Qe+1)),me=Ce.lowerBoxAlpha=pluck(Ae.lowerboxalpha,qe.lowerboxalpha,x,HUNDREDSTRING),ee=0;ee<We;ee++){if(A=Ee&&Ee[ee],L=Fe[ee],y=L&&L.config,L||(L=Fe[ee]={graphics:{}}),L.config||(y=Fe[ee].config={}),!A.value){y.setValue=UNDEFINED;continue}A.value&&(He.setArray(A.value),oe=He.getQuartiles(),re=oe.q1,ae=oe.q3,le=He.getMinMax(),y.min=te=le.min,y.max=ie=le.max,se=He.getMedian(),y.mean=ne=He.getMean(),y.md=pe=He.getMD(),y.sd=de=He.getSD(),y.qd=he=He.getQD()),y.upperQuartile={value:ae,color:convertColor(pluck(A.upperquartilecolor,Ae.upperquartilecolor,qe.upperquartilecolor,qe.plotbordercolor,Ve.getColor(PLOTBORDERCOLOR)),pluckNumber(A.upperquartilealpha,Ae.upperquartilealpha,qe.upperquartilealpha,qe.plotborderalpha,100)),borderWidth:pluckNumber(A.upperquartilethickness,Ae.upperquartilethickness,qe.upperquartilethickness,qe.plotborderthickness,m?0:1),displayValue:Ne.dataLabels(ae)},y.lowerQuartile={value:re,color:convertColor(pluck(A.lowerquartilecolor,Ae.lowerquartilecolor,qe.lowerquartilecolor,qe.plotbordercolor,Ve.getColor(PLOTBORDERCOLOR)),pluckNumber(A.lowerquartilealpha,Ae.lowerquartilealpha,qe.lowerquartilealpha,qe.plotborderalpha,100)),borderWidth:pluckNumber(A.lowerquartilethickness,Ae.lowerquartilethickness,qe.lowerquartilethickness,qe.plotborderthickness,m?0:1),displayValue:Ne.dataLabels(re)},y.upperBoxBorder={color:convertColor(pluck(A.upperboxbordercolor,Ae.upperboxbordercolor,qe.upperboxbordercolor,qe.plotbordercolor,Ve.getColor(PLOTBORDERCOLOR)),pluckNumber(A.upperboxborderalpha,Ae.upperboxborderalpha,qe.upperboxborderalpha,qe.plotborderalpha,100)),borderWidth:pluckNumber(A.upperboxborderthickness,Ae.upperboxborderthickness,qe.upperboxborderthickness,!m&&qe.plotborderthickness,m?0:1)},y.lowerBoxBorder={color:convertColor(pluck(A.lowerboxbordercolor,Ae.lowerboxbordercolor,qe.lowerboxbordercolor,qe.plotbordercolor,Ve.getColor(PLOTBORDERCOLOR)),pluckNumber(A.lowerboxborderalpha,Ae.lowerboxborderalpha,qe.lowerboxborderalpha,qe.plotborderalpha,100)),borderWidth:pluckNumber(A.lowerboxborderthickness,Ae.lowerboxborderthickness,qe.lowerboxborderthickness,!m&&qe.plotborderthickness,m?0:1)},y.median={value:se,color:convertColor(pluck(A.mediancolor,Ae.mediancolor,qe.mediancolor,qe.plotbordercolor,Ve.getColor(PLOTBORDERCOLOR)),pluckNumber(A.medianalpha,Ae.medianalpha,qe.medianalpha,qe.plotborderalpha,100)),borderWidth:pluckNumber(A.medianthickness,Ae.medianthickness,qe.medianthickness,qe.plotborderthickness,1),displayValue:Ne.dataLabels(se)},Ce.upperBoxColor=ue=pluck(A.upperboxcolor,Ae.upperboxcolor,qe.upperboxcolor,Ve.getPlotColor(2*Qe)),ce=Ce.upperBoxAlpha=pluck(A.upperboxalpha,Ae.upperboxalpha,qe.upperboxalpha,x,HUNDREDSTRING),Ce.lowerBoxColor=be=pluck(A.lowerboxcolor,Ae.lowerboxcolor,qe.lowerboxcolor,Ve.getPlotColor(2*Qe+1)),me=Ce.lowerBoxAlpha=pluck(A.lowerboxalpha,Ae.lowerboxalpha,qe.lowerboxalpha,x,HUNDREDSTRING),y.upperColorArr=getColumnColor(ue,ce,UNDEFINED,UNDEFINED,m,f,B.toString(),0,!1),y.lowerColorArr=getColumnColor(be,me,UNDEFINED,UNDEFINED,m,f,B.toString(),0,!1),y.showValue=pluckNumber(A.showvalue,ge),y.showMinValues=y.showValue?pluckNumber(A.showminvalues,Ce.showminvalues):0,y.showMaxValues=y.showValue?pluckNumber(A.showmaxvalues,Ce.showmaxvalues):0,y.showQ1Values=y.showValue?pluckNumber(A.showq1values,Ce.showq1values):0,y.showQ3Values=y.showValue?pluckNumber(A.showq3values,Ce.showq3values):0,y.showMedianValues=y.showValue?pluckNumber(A.showmedianvalues,Ce.showmedianvalues):0,y.upperWhiskerAlpha=we=getFirstAlpha(pluck(A.upperwhiskeralpha,Ae.upperwhiskeralpha,qe.upperwhiskeralpha,qe.plotborderalpha,100)),y.upperWhiskerColor=convertColor(getFirstColor(pluck(A.upperwhiskercolor,Ae.upperwhiskercolor,qe.upperwhiskercolor,qe.plotbordercolor,Ve.getColor(PLOTBORDERCOLOR))),we),y.upperWhiskerThickness=pluckNumber(A.upperwhiskerthickness,Ae.upperwhiskerthickness,qe.upperwhiskerthickness,qe.plotborderthickness,1),y.upperWhiskerShadowOpacity=Ce.showShadow?we/100:0,y.lowerWhiskerAlpha=ke=getFirstAlpha(pluck(A.lowerwhiskeralpha,Ae.lowerwhiskeralpha,qe.lowerwhiskeralpha,qe.plotborderalpha,100)),y.lowerWhiskerColor=convertColor(getFirstColor(pluck(A.lowerwhiskercolor,Ae.lowerwhiskercolor,qe.lowerwhiskercolor,qe.plotbordercolor,Ve.getColor(PLOTBORDERCOLOR))),ke),y.lowerWhiskerThickness=pluckNumber(A.lowerwhiskerthickness,Ae.lowerwhiskerthickness,qe.lowerwhiskerthickness,qe.plotborderthickness,1),y.lowerWhiskerShadowOpacity=Ce.showShadow?ke/100:0,y.setValue=E=Ne.getCleanValue(A.value),y.setLink=pluck(A.link),y.toolTipValue=z=Ne.dataLabels(E,X),y.setDisplayValue=K=parseUnsafeString(A.displayvalue),y.displayValue=pluck(K,z),Y=pluckNumber(A.dashed),Z=pluckNumber(A.dashlen,u),$=c=pluckNumber(A.dashgap,c),Ie=o(Ie,ie),Ue=r(Ue,te),y.plotBorderDashStyle=1===Y?getDashStyle(Z,$,b):0===Y?NONE:C,De=pluck(A.color,Ce.plotColor),x=pluck(A.alpha,Ce.plotfillalpha),0>E&&!m&&(d=g,g=360-g),y.colorArr=getColumnColor(De+COMMA+k,x,v,g,m,f,B.toString(),0,!1),y.label=T=getValidValue(parseUnsafeString(Te.getLabel(pluckNumber(ee)).label)),0!==w&&(S=pluck(A.upperboxhovercolor,Ae.upperboxhovercolor,qe.upperboxhovercolor,ue),W=pluck(A.upperboxhoveralpha,Ae.upperboxhoveralpha,qe.upperboxhoveralpha,ce),q=pluck(A.upperboxborderhovercolor,Ae.upperboxborderhovercolor,qe.upperboxborderhovercolor,A.upperboxbordercolor,Ae.upperboxbordercolor,qe.upperboxbordercolor,qe.plotbordercolor,Ve.getColor(PLOTBORDERCOLOR)),V=pluck(A.upperboxborderhoveralpha,Ae.upperboxborderhoveralpha,qe.upperboxborderhoveralpha,A.upperboxborderalpha,Ae.upperboxborderalpha,qe.upperboxborderalpha,qe.plotborderalpha,100),Q=m?0:pluck(A.upperboxborderhoverthickness,Ae.upperboxborderhoverthickness,qe.upperboxborderhoverthickness,y.upperBoxBorder.borderWidth),D=pluck(A.lowerboxhovercolor,Ae.lowerboxhovercolor,qe.lowerboxhovercolor,be),R=pluck(A.lowerboxhoveralpha,Ae.lowerboxhoveralpha,qe.lowerboxhoveralpha,me),O=pluck(A.lowerboxborderhovercolor,Ae.lowerboxborderhovercolor,qe.lowerboxborderhovercolor,A.lowerboxbordercolor,Ae.lowerboxbordercolor,qe.lowerboxbordercolor,qe.plotbordercolor,Ve.getColor(PLOTBORDERCOLOR)),M=pluck(A.lowerboxborderhoveralpha,Ae.lowerboxborderhoveralpha,qe.lowerboxborderhoveralpha,A.lowerboxborderalpha,Ae.lowerboxborderalpha,qe.lowerboxborderalpha,qe.plotborderalpha,100),P=m?0:pluck(A.lowerboxborderhoverthickness,Ae.lowerboxborderhoverthickness,qe.lowerboxborderhoverthickness,y.lowerBoxBorder.borderWidth),G=pluck(A.upperquartilehovercolor,Ae.upperquartilehovercolor,qe.upperquartilehovercolor,A.upperquartilecolor,Ae.upperquartilecolor,qe.upperquartilecolor,qe.plotbordercolor,Ve.getColor(PLOTBORDERCOLOR)),F=pluck(A.upperquartilehoveralpha,Ae.upperquartilehoveralpha,qe.upperquartilehoveralpha,A.upperquartilealpha,Ae.upperquartilealpha,qe.upperquartilealpha,qe.plotborderalpha,100),N=pluck(A.upperquartilehoverthickness,Ae.upperquartilehoverthickness,qe.upperquartilehoverthickness,y.upperQuartile.borderWidth),I=pluck(A.lowerquartilehovercolor,Ae.lowerquartilehovercolor,qe.lowerquartilehovercolor,A.lowerquartilecolor,Ae.lowerquartilecolor,qe.lowerquartilecolor,qe.plotbordercolor,Ve.getColor(PLOTBORDERCOLOR)),U=pluck(A.lowerquartilehoveralpha,Ae.lowerquartilehoveralpha,qe.lowerquartilehoveralpha,A.lowerquartilealpha,Ae.lowerquartilealpha,qe.lowerquartilealpha,qe.plotborderalpha,100),H=pluck(A.lowerquartilehoverthickness,Ae.lowerquartilehoverthickness,qe.lowerquartilehoverthickness,y.lowerQuartile.borderWidth),_=pluck(A.medianhovercolor,Ae.medianhovercolor,qe.medianhovercolor,A.mediancolor,Ae.mediancolor,qe.mediancolor,qe.plotbordercolor,Ve.getColor(PLOTBORDERCOLOR)),J=pluck(A.medianhoveralpha,Ae.medianhoveralpha,qe.medianhoveralpha,A.medianalpha,Ae.medianalpha,qe.medianalpha,qe.plotborderalpha,100),j=pluck(A.medianhoverthickness,Ae.medianhoverthickness,qe.medianhoverthickness,y.median.borderWidth),1===w&&(ue===S&&(S=getLightColor(S,70)),be===D&&(D=getLightColor(D,70))),y.upperBoxHoverColorArr=getColumnColor(S,W,UNDEFINED,UNDEFINED,m,f,B.toString(),0,!1),y.lowerBoxHoverColorArr=getColumnColor(D,R,UNDEFINED,UNDEFINED,m,f,B.toString(),0,!1),y.setUpperBoxRolloutAttr={fill:toRaphaelColor(y.upperColorArr[0])},y.setUpperBoxRolloverAttr={fill:toRaphaelColor(y.upperBoxHoverColorArr[0])},y.setLowerBoxRolloutAttr={fill:toRaphaelColor(y.lowerColorArr[0])},y.setLowerBoxRolloverAttr={fill:toRaphaelColor(y.lowerBoxHoverColorArr[0])},y.setUpperBoxBorderRolloverAttr={stroke:convertColor(q,V),"stroke-width":Q},y.setUpperBoxBorderRolloutAttr={stroke:y.upperBoxBorder.color,"stroke-width":y.upperBoxBorder.borderWidth},y.setLowerBoxBorderRolloverAttr={stroke:convertColor(O,M),"stroke-width":P},y.setLowerBoxBorderRolloutAttr={stroke:y.lowerBoxBorder.color,"stroke-width":y.lowerBoxBorder.borderWidth},y.setUpperQuartileRolloverAttr={stroke:convertColor(G,F),"stroke-width":N},y.setUpperQuartileRolloutAttr={stroke:y.upperQuartile.color,"stroke-width":y.upperQuartile.borderWidth},y.setLowerQuartileRolloverAttr={stroke:convertColor(I,U),"stroke-width":H},y.setLowerQuartileRolloutAttr={stroke:y.lowerQuartile.color,"stroke-width":y.lowerQuartile.borderWidth},y.setMedianRolloverAttr={stroke:convertColor(_,J),"stroke-width":j},y.setMedianRolloutAttr={stroke:y.median.color,"stroke-width":y.median.borderWidth}),t=y.toolTipValue,n=getValidValue(parseUnsafeString(pluck(A.tooltext,Ae.plottooltext,qe.plottooltext))),l?null===t?h=!1:n===UNDEFINED?h='<b>Maximum'+Ge+BOLDENDTAG+Ne.dataLabels(ie)+BREAKSTRING+BOLDSTARTTAG+Q3_STR+Ge+BOLDENDTAG+Ne.dataLabels(ae)+BREAKSTRING+BOLDSTARTTAG+MEDIAN_STR+Ge+BOLDENDTAG+Ne.dataLabels(se)+BREAKSTRING+BOLDSTARTTAG+Q1_STR+Ge+BOLDENDTAG+Ne.dataLabels(re)+BREAKSTRING+BOLDSTARTTAG+MINIMUM_STR+Ge+BOLDENDTAG+Ne.dataLabels(te):(p=[1,2,3,4,5,6,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80],s={maxValue:ie,maxDataValue:Ne.dataLabels(ie),minValue:te,minDataValue:Ne.dataLabels(te),Q1:Ne.dataLabels(re),unformattedQ1:re,Q3:Ne.dataLabels(ae),unformattedQ3:ae,median:Ne.dataLabels(se),unformattedMedian:se,SD:Ne.dataLabels(de),unformattedsd:de,QD:Ne.dataLabels(he),unformattedQD:he,MD:Ne.dataLabels(pe),unformattedMD:pe,mean:Ne.dataLabels(ne),unformattedMean:ne,label:T,yaxisName:Me,xaxisName:Pe,formattedValue:t,value:T},h=parseTooltext(n,p,s,A,qe,Ae)):h=!1,y.toolText=h,y.setTooltext=h,d&&(g=d)}xe?(Be=fe._getOutLiersLimit(),Ie=o(Ie,Be.max),Ue=r(Ue,Be.min)):(ve=Ie-Ue,Ie+=Ce.outliersupperrangeratio*ve,Ue-=Ce.outlierslowerrangeratio*ve),Ce.maxValue=Ie,Ce.minValue=Ue,fe.setState('dirty',!0),fe._createSubDS(),ye.showLegend&&fe._addLegend()}_createSubDS(){var e=this,o=e.config,r=o.index,a=e.getFromEnv('lineJSON')[r],l=a.length;datasetFactory(e,LineDataset,'dataset',l,a,createChildIndices(r,l)),l||e.iterateComponents(e=>{'line'===e.getName()&&e.remove()})}_getOutLiersLimit(){var e,o,r,a,l,t=this,s=t.config.index,n=t.getFromEnv('lineJSON')[s],p=n.length,d=-Infinity,h=+Infinity;for(l=0;l<p;l++)if(e=n[l],'Outliers'===e.seriesname){for(a=e.data,o=a.length,r=0;r<o;r++)d=Math.max(a[r].value,d),h=Math.min(a[r].value,h);return{max:d,min:h}}return{max:d,min:h}}parsePlotAttributes(e,o){var r,a,l,t,s,n,p,d,h,u,c,b,m,w,g,x,v,k,B,f,C,A,E,L,y,T,S,W,q,Q,D,R,O,P,G,F,N,I,U,_,J,j,z,K,X,Y,Z,$,ee,oe,re,ae,le,te,ie,se=Math.round,ne=Math.max,pe=Math.min,de=this,he=de.config.JSONData,ue=de.config,ce=ue.index,be=o,i=de.getState('visible'),me=de.getFromEnv('chart'),we=de.getFromEnv('chartConfig'),ge=de.getFromEnv('xAxis'),xe=de.getFromEnv('yAxis'),ve=de.components.data,ke=we.dataLabelStyle,Be=ue.rotatevalues,fe=ue.valuepadding,Ce=de.getFromEnv('number-formatter'),Ae=Be?POSITION_LEFT:POSITION_MIDDLE,Ee=de.getFromEnv('smartLabel'),Le=+Infinity;l=de.getFromEnv('columnXShift'),a=de.getFromEnv('columnWidth'),p=e&&e.config,n=p&&p.setValue;e===UNDEFINED||n===UNDEFINED||null===n||(y=e.graphics,s=p.setLink,!e.graphics&&(ve[be].graphics={}),!y.label&&(ve[be].graphics.label=[]),r=ge.getPixel(be)+l,d=p.upperQuartile||{},h=d&&d.value,u=(h||0===h)&&xe.getPixel(h),c=p.lowerQuartile||{},b=c&&c.value,m=(b||0===b)&&xe.getPixel(b),w=p.median,g=w&&w.value,x=(g||0===g)&&xe.getPixel(g),v=x-u,k=m-x,B=p.upperBoxBorder||{},f=p.lowerBoxBorder||{},t=p.toolText,p.eventArgs={index:be,link:s,maximum:p.max,minimum:p.min,median:g,q3:d.value,q1:c.value,maxDisplayValue:p.showMaxValues?Ce.dataLabels(p.max):BLANKSTRING,minDisplayValue:p.showMinValues?Ce.dataLabels(p.min):BLANKSTRING,medianDisplayValue:p.showMedianValues?Ce.dataLabels(g):BLANKSTRING,q1DisplayValue:p.showQ1Values?Ce.dataLabels(c.value):BLANKSTRING,q3DisplayValue:p.showQ3Values?Ce.dataLabels(d.value):BLANKSTRING,categoryLabel:p.label,toolText:t,datasetIndex:ce,datasetName:he.seriesname,visible:i},C=se(r)+.5*(B.borderWidth%2),A=se(r+a)+.5*(B.borderWidth%2),E=se(u)+.5*(d.borderWidth%2),a=A-C,L={upperBox:{fill:toRaphaelColor(p.upperColorArr[0]),"stroke-width":0,"stroke-dasharray":NONE,cursor:s?POINTER:BLANKSTRING,visibility:i},lowerBox:{fill:toRaphaelColor(p.lowerColorArr[0]),"stroke-width":0,"stroke-dasharray":NONE,cursor:s?POINTER:BLANK,visibility:i},upperBoxBorder:{stroke:B.color,"stroke-width":B.borderWidth,"stroke-linecap":ROUND,dashstyle:B.dashStyle,visibility:i},lowerBoxBorder:{stroke:f.color,"stroke-width":f.borderWidth,dashstyle:f.dashStyle,"stroke-linecap":ROUND,visibility:i},upperQuartile:{stroke:toRaphaelColor(d.color),"stroke-width":d.borderWidth,"stroke-dasharray":d.dashSyle,"stroke-linecap":ROUND,cursor:s?POINTER:BLANK,visibility:i},lowerQuartile:{stroke:toRaphaelColor(c.color),"stroke-width":c.borderWidth,"stroke-dasharray":c.dashSyle,cursor:s?POINTER:BLANKSTRING,"stroke-linecap":ROUND,visibility:i},median:{stroke:toRaphaelColor(w.color),"stroke-width":w.borderWidth,"stroke-dasharray":w.dashSyle,cursor:s?POINTER:BLANKSTRING,"stroke-linecap":ROUND,visibility:i}},ae=N||E,K=Object.assign({x:C,y:N||E,width:ne(a,0),height:ne(pe(Le,v),0),r:0},L.upperBox),z=Object.assign({path:[M,C,N||E,V,N||E+v,M,A,N||E,V,N||E+v]},L.upperBoxBorder),X=Object.assign({path:[M,C,N||E,H,C+a]},L.upperQuartile),T=E,S=a*(ue.whiskerslimitswidthratio/100),W=S/2,q=xe.getPixel(p.max),D=q,Q=C,D=se(q)+p.upperWhiskerThickness%2/2,C=se(C+a/2)+p.upperWhiskerThickness%2/2,R=[M,C,N||T,V,pe(N||D,ae),M,C-W,pe(N||D,ae),H,C+W],Y={path:R,"stroke-width":p.upperWhiskerThickness,cursor:s?POINTER:BLANKSTRING,"stroke-linecap":ROUND,stroke:p.upperWhiskerColor},Ee.useEllipsesOnOverflow(me.config.useEllipsesWhenOverflow),Ee.setStyle(ke),O=Ee.getOriSize(Ce.dataLabels(p.max)),P=Be?O.width:O.height,F=q-.5*p.upperWhiskerThickness-fe-P*(Be?.5:1),F-(Be?P/2:0)<we.canvasTop&&(F=we.canvasTop+(Be?P/2:0)),Z={text:Ce.dataLabels(p.max),x:Q+a/2,title:d.originalText||BLANKSTRING,y:N||F,"text-anchor":Be?POSITION_MIDDLE:Ae,"vertical-align":Be?POSITION_MIDDLE:POSITION_TOP,visibility:visibleStr,direction:ue.textDirection,fill:ke.color,transform:getSuggestiveRotation(Be,Q+a/2,F),"text-bound":[ke.backgroundColor,ke.borderColor,ke.borderThickness,ke.borderPadding,ke.borderRadius,ke.borderDash]},C=se(r)+.5*(f.borderWidth%2),A=se(r+a)+.5*(f.borderWidth%2),E=se(x+k)+.5*(c.borderWidth%2),le=N||x,te=ne(pe(Le,E-x),0),ie=le+te,U=Object.assign({x:C,y:le,width:ne(a,0),height:te,r:0},L.lowerBox),I=Object.assign({path:[M,C,N||x,V,N||x+k,M,A,N||x,V,N||x+k]},L.lowerBoxBorder),E=se(x+k)+.5*(c.borderWidth%2),_=Object.assign({path:[M,C,N||E,H,C+a]},L.lowerQuartile),T=E,S=a*(ue.whiskerslimitswidthratio/100),W=S/2,q=xe.getPixel(p.min),D=q,Q=C,D=se(q)+p.lowerWhiskerThickness%2/2,Q=se(Q+a/2)+p.lowerWhiskerThickness%2/2,R=[M,Q,N||T,V,ne(N||D,ie),M,Q-W,ne(N||D,ie),H,Q+W],Ee.setStyle(ke),O=Ee.getOriSize(Ce.dataLabels(p.min)),P=Be?O.width:O.height,G=q+.5*p.lowerWhiskerThickness+fe,G+P>we.canvasBottom&&(G=we.canvasBottom-P),$={text:Ce.dataLabels(p.min),x:Q,title:d.originalText||BLANKSTRING,y:N||G,"text-anchor":Be?POSITION_END:Ae,"vertical-align":Be?POSITION_MIDDLE:POSITION_TOP,visibility:visibleStr,direction:ue.textDirection,fill:ke.color,transform:getSuggestiveRotation(Be,Q,G),"text-bound":[ke.backgroundColor,ke.borderColor,ke.borderThickness,ke.borderPadding,ke.borderRadius,ke.borderDash]},J={path:R,"stroke-width":p.lowerWhiskerThickness,cursor:s?POINTER:BLANKSTRING,"stroke-linecap":ROUND,stroke:p.lowerWhiskerColor},E=se(x)+.5*(w.borderWidth%2),j=Object.assign({path:[M,C,N||E,H,C+a]},L.median),Ae=Be?POSITION_LEFT:POSITION_MIDDLE,ee={text:d.displayValue,x:r+a/2,title:d.originalText||BLANKSTRING,y:u-fe,"text-anchor":Be?POSITION_START:Ae,"vertical-align":Be?POSITION_MIDDLE:POSITION_BOTTOM,visibility:visibleStr,direction:ue.textDirection,fill:ke.color,transform:getSuggestiveRotation(Be,r+a/2,u-fe),"text-bound":[ke.backgroundColor,ke.borderColor,ke.borderThickness,ke.borderPadding,ke.borderRadius,ke.borderDash]},re={text:w.displayValue,x:C+a/2,y:x-fe,title:w.originalText||BLANKSTRING,"text-anchor":Be?POSITION_START:Ae,"vertical-align":Be?POSITION_MIDDLE:POSITION_BOTTOM,visibility:visibleStr,direction:ue.textDirection,fill:ke.color,transform:getSuggestiveRotation(Be,C+a/2,x-fe),"text-bound":[ke.backgroundColor,ke.borderColor,ke.borderThickness,ke.borderPadding,ke.borderRadius,ke.borderDash]},oe={text:c.displayValue,x:r+a/2,y:m+fe,title:c.originalText||BLANKSTRING,"text-anchor":Be?POSITION_START:Ae,"vertical-align":Be?POSITION_MIDDLE:POSITION_TOP,visibility:visibleStr,direction:ue.textDirection,fill:ke.color,transform:getSuggestiveRotation(Be,r+a/2,m+fe),"text-bound":[ke.backgroundColor,ke.borderColor,ke.borderThickness,ke.borderPadding,ke.borderRadius,ke.borderDash]},p.props={lowerBoxBorderEle:{attr:I},lowerBoxElem:{attr:U},lowerQuartileEle:{attr:_},lowerWhiskerEle:{attr:J},midLineElem:{attr:j},upperBoxElem:{attr:K},upperBoxBorderEle:{attr:z},upperQuartileEle:{attr:X},upperWhiskerEle:{attr:Y},upperQuartileMaxLabel:{attr:Z},upperQuartileMinLabel:{attr:$},medianLabel:{attr:re},upperQuartileLabel:{attr:ee},lowerQuartileLabel:{attr:oe}})}allocatePosition(){var e,o,r,a=this,l=a.config.JSONData.data,t=l&&l.length,s=a.getFromEnv('xAxis'),n=s.getTicksLen(),p=a.components.data;for(r=Math.min(n,t),a.setColumnPosition(),o=0;o<r;o++)e=p[o],a.parsePlotAttributes(e,o)}drawPlots(){var e,o,r,a,l,t,s,n,p,d,h,u,c,b,m,w,g,x,v,B,f,C,A,E,L,y,T,S,W,q,V,Q,D,R,O,M,P,G,F,N,I,U,H,_,J,j,z,K,X=this,Y=X.config.JSONData,Z=X.config,$=Z.index,ee=Y.data,oe=ee&&ee.length,re=X.getState('visible'),ae=X.getFromEnv('chart'),le=X.getFromEnv('xAxis'),te=le.getTicksLen(),ie=Z.showtooltip,se=X.getFromEnv('toolTipController'),ne=X.components.data,pe=Z.showShadow,de=X.getContainer('upperBoxGroup').toBack(),he=X.getContainer('lowerBoxGroup'),ue=X.getContainer('medianGroup'),ce=X.getContainer('upperWhiskerGroup'),be=X.getContainer('lowerWhiskerGroup'),me=X.getContainer('labelGroup'),we=X.getContainer('shadowGroup'),ge=X.getFromEnv('smartLabel'),xe=X.components.removeDataArr||[],ve=xe.length,ke=Z.showHoverEffect,Be=X.getFromEnv('animationManager'),fe=function(o){return function(r){ae.plotEventHandler(o,r)}},Ce=function(e,o){return function(r){if(0!==o.data(showHoverEffectStr))for(var a in e)a!==LABEL&&(Be.setAnimation({el:e[a],doNotRemove:!0,attr:o.data(SETROLLOVERATTR)[a],component:X}),ae.plotEventHandler(o,r,ROLLOVER))}},Ae=function(e,o){return function(r){if(0!==o.data(showHoverEffectStr))for(var a in e)a!==LABEL&&(Be.setAnimation({el:e[a],doNotRemove:!0,attr:o.data(SETROLLOUTATTR)[a],component:X}),ae.plotEventHandler(o,r,ROLLOUT))}};for(n=function(e){return function(){this.show(),this.shadow(e)}},X.setColumnPosition(),re?(de.show(),he.show(),ce.show(),be.show(),ue.show(),we.show(),me.show(),X._conatinerHidden=!1):(me.hide(),ce.hide(),de.hide(),be.hide(),he.hide(),ue.hide(),we.hide()),e=Math.min(te,oe),o=0;o<e;o++){if(a=ne[o],t=a&&a.config,l=t&&t.setValue,O=!1,M=!1,P=!1,G=!1,F=!1,N=!1,I=!1,U=!1,H=!1,a===UNDEFINED||l===UNDEFINED||null===l){for(D in R=a.graphics,R)if(R[D]instanceof Array)for(z=R[D],j=0,K=z.length;j<K;j++)z[j]&&z[j].hide();else R[D].hide();continue}T=a.graphics,a.graphics||(ne[o].graphics={}),T.label||(ne[o].graphics.label=[]),s=t.upperQuartile||{},p=t.lowerQuartile||{},d=t.median,r=t.toolText,S=$+UNDERSCORE+o,u=a.graphics.upperBoxElem,h=Be.setAnimation({el:u||'rect',attr:t.props.upperBoxElem.attr,label:'upperBox',container:de,component:X}),u||(a.graphics.upperBoxElem=h,O=!0),h.shadow({opacity:pe?Z.upperBoxAlpha/100:0},we),b=a.graphics.upperBoxBorderEle,c=Be.setAnimation({el:b||'path',attr:t.props.upperBoxBorderEle.attr,container:de,label:'path',component:X}),b||(a.graphics.upperBoxBorderEle=c,P=!0),w=a.graphics.upperQuartileEle,m=Be.setAnimation({el:w||'path',attr:t.props.upperQuartileEle.attr,label:'path',container:de,component:X}),w||(a.graphics.upperQuartileEle=m,F=!0),q=a.graphics.upperWhiskerEle,W=Be.setAnimation({el:q||'path',attr:t.props.upperWhiskerEle.attr,label:'path',container:ce,component:X}),n({opacity:t.upperWhiskerShadowOpacity},we),q||(a.graphics.upperWhiskerEle=W,U=!0),ge.useEllipsesOnOverflow(ae.config.useEllipsesWhenOverflow),t.showMaxValues?(y=T.label[3],y&&y.show(),L=Be.setAnimation({el:y||'text',attr:t.props.upperQuartileMaxLabel.attr,component:X,label:'text',container:me}),!y&&(T.label[3]=L),T.label[3].data(GROUPID,S)):T.label[3]&&Be.setAnimation({el:T.label[3],component:X,attr:{"text-bound":[]},callback:_hide.call(T.label[3])}),x=a.graphics.lowerBoxElem,g=Be.setAnimation({el:x||'rect',attr:t.props.lowerBoxElem.attr,label:'lowerBox',container:he,component:X}),x||(a.graphics.lowerBoxElem=g,M=!0),g.shadow({opacity:pe?Z.lowerBoxAlpha/100:0},we),B=a.graphics.lowerBoxBorderEle,v=Be.setAnimation({el:B||'path',attr:t.props.lowerBoxBorderEle.attr,component:X,label:'path',container:he}),B||(a.graphics.lowerBoxBorderEle=v,G=!0),C=a.graphics.lowerQuartileEle,f=Be.setAnimation({el:C||'path',attr:t.props.lowerQuartileEle.attr,component:X,label:'path',container:he}),C||(a.graphics.lowerQuartileEle=f,N=!0),V=a.graphics.lowerWhiskerEle,t.showMinValues?(y=T.label[4],y&&y.show(),L=Be.setAnimation({el:y||'text',attr:t.props.upperQuartileMinLabel.attr,label:'text',container:me,component:X}),!y&&(T.label[4]=L),T.label[4].data(GROUPID,S)):T.label[4]&&Be.setAnimation({el:T.label[4],component:X,attr:{"text-bound":[]},callback:_hide.call(T.label[4])}),Q=a.graphics.lowerWhiskerEle,V=Be.setAnimation({el:Q||'path',attr:t.props.lowerWhiskerEle.attr,label:'path',container:be,component:X}),n({opacity:t.lowerWhiskerShadowOpacity},we),Q||(a.graphics.lowerWhiskerEle=V,H=!0),E=a.graphics.midLineElem,A=Be.setAnimation({el:E||'path',component:X,label:'midline',container:ue,attr:t.props.midLineElem.attr}),E||(a.graphics.midLineElem=A,I=!0),_={upperBoxElem:t.setUpperBoxRolloverAttr,lowerBoxElem:t.setLowerBoxRolloverAttr,upperBoxBorderEle:t.setUpperBoxBorderRolloverAttr,lowerBoxBorderEle:t.setLowerBoxBorderRolloverAttr,upperQuartileEle:t.setUpperQuartileRolloverAttr,lowerQuartileEle:t.setLowerQuartileRolloverAttr,midLineElem:t.setMedianRolloverAttr},J={upperBoxElem:t.setUpperBoxRolloutAttr,lowerBoxElem:t.setLowerBoxRolloutAttr,upperBoxBorderEle:t.setUpperBoxBorderRolloutAttr,lowerBoxBorderEle:t.setLowerBoxBorderRolloutAttr,upperQuartileEle:t.setUpperQuartileRolloutAttr,lowerQuartileEle:t.setLowerQuartileRolloutAttr,midLineElem:t.setMedianRolloutAttr},h.data(GROUPID,S).data(EVENTARGS,t.eventArgs).data(showHoverEffectStr,ke).data(SETROLLOVERATTR,_).data(SETROLLOUTATTR,J),O&&(h.on('fc-click',fe(h)),h.on('fc-mouseover',Ce(a.graphics,h)),h.on('fc-mouseout',Ae(a.graphics,h))),g.data(GROUPID,S).data(EVENTARGS,t.eventArgs).data(showHoverEffectStr,ke).data(SETROLLOVERATTR,_).data(SETROLLOUTATTR,J),M&&(g.on('fc-click',fe(g)),g.on('fc-mouseover',Ce(a.graphics,g)),g.on('fc-mouseout',Ae(a.graphics,g))),c.data(GROUPID,S).data(EVENTARGS,t.eventArgs).data(showHoverEffectStr,ke).data(SETROLLOVERATTR,_).data(SETROLLOUTATTR,J),P&&(c.on('fc-click',fe(c)),c.on('fc-mouseover',Ce(a.graphics,c)),c.on('fc-mouseout',Ae(a.graphics,c))),v.data(GROUPID,S).data(EVENTARGS,t.eventArgs).data(showHoverEffectStr,ke).data(SETROLLOVERATTR,_).data(SETROLLOUTATTR,J),G&&(v.on('fc-click',fe(v)),v.on('fc-mouseover',Ce(a.graphics,v)),v.on('fc-mouseout',Ae(a.graphics,v))),m.data(GROUPID,S).data(EVENTARGS,t.eventArgs).data(showHoverEffectStr,ke).data(SETROLLOVERATTR,_).data(SETROLLOUTATTR,J),F&&(m.on('fc-click',fe(m)),m.on('fc-mouseover',Ce(a.graphics,m)),m.on('fc-mouseout',Ae(a.graphics,m))),f.data(GROUPID,S).data(EVENTARGS,t.eventArgs).data(showHoverEffectStr,ke).data(SETROLLOVERATTR,_).data(SETROLLOUTATTR,J),N&&(f.on('fc-click',fe(f)),f.on('fc-mouseover',Ce(a.graphics,f)),f.on('fc-mouseout',Ae(a.graphics,f))),A.data(GROUPID,S).data(EVENTARGS,t.eventArgs).data(showHoverEffectStr,ke).data(SETROLLOVERATTR,_).data(SETROLLOUTATTR,J),I&&(A.on('fc-click',fe(A)),A.on('fc-mouseover',Ce(a.graphics,A)),A.on('fc-mouseout',Ae(a.graphics,A))),W.data(GROUPID,S).data(EVENTARGS,t.eventArgs).data(showHoverEffectStr,ke).data(SETROLLOVERATTR,_).data(SETROLLOUTATTR,J),U&&(W.on('fc-click',fe(W)),W.on('fc-mouseover',Ce(a.graphics,W)),W.on('fc-mouseout',Ae(a.graphics,W))),V.data(GROUPID,S).data(EVENTARGS,t.eventArgs).data(showHoverEffectStr,ke).data(SETROLLOVERATTR,_).data(SETROLLOUTATTR,J),H&&(V.on('fc-click',fe(V)),V.on('fc-mouseover',Ce(a.graphics,V)),V.on('fc-mouseout',Ae(a.graphics,V))),defined(s.displayValue)&&s.displayValue!==BLANK&&t.showQ3Values?(y=T.label[0],y&&y.show(),L=Be.setAnimation({el:y||'text',attr:t.props.upperQuartileLabel.attr,component:X,label:'text',container:me}),!y&&(T.label[0]=L),T.label[0].data(GROUPID,S)):T.label[0]&&Be.setAnimation({el:T.label[0],component:X,attr:{"text-bound":[]},callback:_hide.call(T.label[0])}),defined(d.displayValue)&&d.displayValue!==BLANK&&t.showMedianValues?(y=T.label[1],y&&y.show(),L=Be.setAnimation({el:y||'text',attr:t.props.medianLabel.attr,component:X,label:'text',container:me}),!y&&(T.label[1]=L),T.label[1].data(GROUPID,S)):T.label[1]&&Be.setAnimation({el:T.label[1],component:X,attr:{"text-bound":[]},callback:_hide.call(T.label[1])}),defined(p.displayValue)&&p.displayValue!==BLANK&&t.showQ1Values?(y=T.label[2],L=Be.setAnimation({el:y||'text',component:X,attr:t.props.lowerQuartileLabel.attr,container:me}),!y&&(T.label[2]=L,L.show()),T.label[2].data(GROUPID,S)):T.label[2]&&Be.setAnimation({el:T.label[2],component:X,attr:{"text-bound":[]},callback:_hide.call(T.label[2])}),ie?(se.enableToolTip(h,r),se.enableToolTip(g,r),se.enableToolTip(c,r),se.enableToolTip(v,r),se.enableToolTip(m,r),se.enableToolTip(f,r),se.enableToolTip(A,r),se.enableToolTip(W,r),se.enableToolTip(V,r)):(se.enableToolTip(h,!1),se.enableToolTip(g,!1),se.enableToolTip(c,!1),se.enableToolTip(v,!1),se.enableToolTip(m,!1),se.enableToolTip(f,!1),se.enableToolTip(A,!1),se.enableToolTip(W,!1),se.enableToolTip(V,!1))}(function(){!1===X.getState('visible')&&(!1===X._conatinerHidden||X._conatinerHidden===UNDEFINED)&&(de.hide(),he.hide(),ce.hide(),be.hide(),ue.hide(),we.hide(),me&&me.hide(),X._conatinerHidden=!0)})(),ve&&X.removePlots()}removePlots(){var e,o,r,a,l,t,s=this,n=s.components,p=n.removeDataArr,d=s.getFromEnv('animationManager'),h=p.length;for(a=0;a<h;a++)if(e=p[0],p.splice(0,1),e&&e.graphics)for(o in r=e.graphics,r)if(o!==LABEL)r[o].shadow({opacity:0}),r[o].hide();else for(l=r[o].length,t=0;t<l;t++)r[o][t]&&(r[o][t].shadow({opacity:0}),d.setAnimation({el:r[o][t],component:s,attr:{"text-bound":[]},callback:_hide.call(r[o][t])}))}removeData(e,o,r){var a=this,l=a.components,t=l.data,i=l.removeDataArr||(l.removeDataArr=[]);o=o||1,e=e||0,e+o===t.length?a.endPosition=!0:(0===e||e===UNDEFINED)&&(a.endPosition=!1),l.removeDataArr=i=i.concat(t.splice(e,o)),r&&a.asyncDraw()}__setDefaultConfig(){super.__setDefaultConfig();let e=this.config;e.showplotborder=UNDEFINED,e.plotborderdashlen=UNDEFINED,e.plotborderdashgap=UNDEFINED,e.plotfillalpha=UNDEFINED,e.useroundedges=UNDEFINED,e.ratio=UNDEFINED,e.plotborderthickness=UNDEFINED,e.showvalues=UNDEFINED,e.valuepadding=UNDEFINED,e.showtooltip=UNDEFINED,e.maxcolwidth=UNDEFINED,e.rotatevalues=UNDEFINED,e.use3dlighting=UNDEFINED,e.whiskerslimitswidthratio=UNDEFINED,e.outliersupperrangeratio=UNDEFINED,e.outlierslowerrangeratio=UNDEFINED,e.showalloutliers=UNDEFINED,e.showmean=UNDEFINED,e.showsd=UNDEFINED,e.showmd=UNDEFINED,e.showqd=UNDEFINED,e.showminvalues=UNDEFINED,e.showmaxvalues=UNDEFINED,e.showq1values=UNDEFINED,e.showq3values=UNDEFINED,e.showmedianvalues=UNDEFINED}getDataLimits(){var e=this,o=e.config,r=e.getState('removed');return{max:r?-Infinity:o.maxValue,min:r?+Infinity:o.minValue}}_addLegend(){var e,o,r,a,l=this,t=l.config,i=l.getFromEnv('legend'),s=t.upperBoxColor,n=t.lowerBoxColor;e=COLOR_000000,o={FCcolor:{color:s+COMMA+n,angle:90,ratio:'50, 0',alpha:'100, 100'}},r={label:getFirstValue(l.config.JSONData.seriesname),index:l.getJSONIndex(),mainDS:!0},t.includeInLegend?(a=i.getItem(l.config.legendItemId),!a&&(l.config.legendItemId=i.createItem(l),a=i.getItem(l.config.legendItemId),l.addExtEventListener('fc-click',function(){a.itemClickFn()},a)),a.configure(r),a.setStateCosmetics('default',{symbol:{fill:toRaphaelColor(o),rawFillColor:t.upperBoxColor,stroke:toRaphaelColor(e)},background:{legendBackgroundColor:toRaphaelColor(s),alpha:20}}),l.getState('visible')?a.removeLegendState('hidden'):a.setLegendState('hidden')):l.config.legendItemId&&i.disposeItem(l.config.legendItemId),l._mapChildren(e=>{e.getState('removed')||(e.addToEnv('legendBackgroundColor',s),e&&e._addLegend(!0))})}legendInteractivity(){var e,o,r=this,a=r.getChildren('dataset'),l=r.getState('visible');for(e=l?'hide':'show',o=0;o<(a&&a.length);o++)a[o][e]();r[e]()}drawLabel(){return this}getName(){return'boxandwhisker2D'}childChanged(){return this}show(){super.show()}hide(){super.hide()}}export default BoxAndWhiskerDataset;