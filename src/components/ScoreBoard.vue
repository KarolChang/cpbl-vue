<template>
  <div class="score-board">
    <!-- 計分板 -->
    <table class="table">
      <thead>
        <tr class="table-info">
          <th scope="col">#</th>
          <th scope="col">1</th>
          <th scope="col">2</th>
          <th scope="col">3</th>
          <th scope="col">4</th>
          <th scope="col">5</th>
          <th scope="col">6</th>
          <th scope="col">7</th>
          <th scope="col">8</th>
          <th scope="col">9</th>
          <th scope="col">R</th>
          <th scope="col">H</th>
          <th scope="col">E</th>
        </tr>
      </thead>
      <tbody>
        <tr class="table-dark" id="visiting-score">
          <th scope="row">中信兄弟</th>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr class="table-dark" id="home-score">
          <th scope="row">統一獅</th>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ScoreBoard',
  
}
</script>