import{datasetFactory}from'../../../fc-core/src/lib';import MultiLevelPieDataset from'../dataset/multilevelpie';export default function(a){let b,c,d,e=a.getFromEnv('dataSource'),f={};return b=a.config.categories=e.category||[],c=b.length,!d&&c&&(f=b,d=c),c?void datasetFactory(a,MultiLevelPieDataset,'dataset',d,[f]):void a.setChartMessage()}