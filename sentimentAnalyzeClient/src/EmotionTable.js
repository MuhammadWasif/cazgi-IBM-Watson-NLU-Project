import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
  render() {
    return (
      <div>
        {JSON.stringify(this.props.emotions)}
        <table className='table table-bordered'>
          <tbody>
            {Object.entries(this.props.emotions).map(function (e) {
              return (
                <tr>
                  <td>{e[0]}</td>
                  <td>{e[1]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
export default EmotionTable;
