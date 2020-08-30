import React from 'react';
import MaterialTable from "material-table";

function Results(props) {

 const config = {
   search: false,
   paging: false,
   rowStyle: rowData => {
     if(rowData.stake > 40) {
       return {backgroundColor: 'green'};
     }

     return {};
   }
 };

 const dataSet = props.dataSet;
 if( dataSet == null ){
   return (<div/>);
 }

 const results=[];
 const potValue = dataSet.total * dataSet.wager;
 const goal =   (potValue * 0.85) / dataSet.wager;
 for( var i=dataSet.total; i>0; i-- ){
   var stake = ((potValue * 0.85)/i).toFixed(2);
   if( i === dataSet.eligible ){
   results.push({total: dataSet.total, eligible: i, pot: potValue, stake: stake});
   results.push({total: '...', eligible: '...', pot: '...', stake: '...'});
   }
   if( i > (goal-5) && i <(goal+5) ){
   results.push({total: dataSet.total, eligible: i, pot: potValue, stake: stake});
   }
 }

 console.log(JSON.stringify(dataSet));

  return (
    <div style={{ maxWidth: "80%" }}>
      <MaterialTable title='StepBet Results'
        columns = {[
          {title : "Players",  field : "total",    type: 'numeric'},
          {title : "Eligible", field : "eligible", type: 'numeric'},
          {title : "Pot",      field : "pot",      type: 'numeric'},
          { title : "Stake",   field : "stake",    type: 'numeric'},
        ]}
        data = {results}
        options={config}/>
    </div>
  );
}

export default Results;
