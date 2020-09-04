import MaterialTable from 'material-table';
import React from 'react';
import {useParams} from 'react-router-dom';

function Results(props) {
  const params = useParams();
  const isFullMode = (params.eligible == null);
  params.wager = parseInt(params.wager, 10);
  params.total = parseInt(params.total, 10);
  params.eligible = parseInt(params.eligible, 10);

  console.log(params);
  console.log(`isFullMode: ${isFullMode}`);

  const config = {
    search: false,
    paging: false,
    rowStyle: rowData => {
      if (rowData.eligible === params.eligible) {
        return {backgroundColor: '#256EFF'};
      }

      if (rowData.stake > 40) {
        return {backgroundColor: '#3DDC97'};
      }

      return {backgroundColor: '#FCFCFC'};
    }
  };

  if (params == null) {
    return (<div />);
  }

  const results = [];
  const potValue = params.total * params.wager;
  const goal = (potValue * 0.85) / params.wager;
  for (var i = params.total; i > 0; i--) {
    var stake = ((potValue * 0.85) / i).toFixed(2);
    if (isFullMode) {
      results.push({total: params.total, eligible: i, pot: potValue, stake: stake});
    } else {
      if (params.eligible > goal) {
        if (i === params.eligible) {
          if (Math.abs(goal - params.eligible) > 5) {
            results.push({total: params.total, eligible: i, pot: potValue, stake: stake});
            results.push({total: '...', eligible: '...', pot: '...', stake: '...'});
          }
        }
        if (i > (goal - 5) && i < (goal + 5)) {
          results.push({total: params.total, eligible: i, pot: potValue, stake: stake});
        }
      } else {
        if (i > (params.eligible - 5) && i < (params.eligible + 5)) {
          results.push({total: params.total, eligible: i, pot: potValue, stake: stake});
        }
      }
    }
  }

  return (
    <div style={{
    maxWidth: '400px' }}>
      <MaterialTable title='StepBet Results'
        columns = {[
          {title : 'Players',  field : 'total',    type: 'numeric'},
          {title : 'Eligible', field : 'eligible', type: 'numeric'},
          {title : 'Pot',      field : 'pot',      type: 'numeric'},
          { title : 'Stake',   field : 'stake',    type: 'numeric'},
        ]}
        data = {results}
        options={
    config}/>
    </div>
  );
}

export default Results;
