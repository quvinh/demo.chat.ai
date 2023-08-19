import React from "react";

export default function FineTune() {
  return (
    <div className="fine-tunes__tab tab">
      <div className="fine-tunes__tab__top">
        <div className="fine-tunes__tab__top__title">Fine Tunes</div>
      </div>
      <div className="fine-tunes__middle">
        <table>
          <thead>
            <tr>
              <th>Radio btn</th>
              <th>ID File</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="radio" />
              </td>
              <td>ft-ueoqkdgjeieimtjrk3</td>
              <td>
                <span className="fine-tunes-status">succeeded</span>
                </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="fine-tunes__bottom"></div>
    </div>
  );
}
