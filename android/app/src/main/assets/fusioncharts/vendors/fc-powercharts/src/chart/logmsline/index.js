import MSLog from'../_internal/mslog';import LineDataset from'../../../../fc-charts/src/dataset/line';import{_setDefaultConfig}from'../../../../fc-charts/src/chart/_internal/areabase';let LINE='line';class LogMSLine extends MSLog{static getName(){return'LogMSLine'}constructor(){super(),this.defaultPlotShadow=1}getName(){return'LogMSLine'}__setDefaultConfig(){super.__setDefaultConfig();let a=this.config;a.friendlyName='Multi-series Line Chart',a.defaultDatasetType=LINE,a.zeroplanethickness=1,a.enablemousetracking=!0,a.zeroplanealpha=40,a.showzeroplaneontop=0,a.enablemousetracking=!0,a.defaultcrosslinethickness=1,_setDefaultConfig.call(this)}getDSGroupdef(){}getDSdef(){return LineDataset}}export default LogMSLine;