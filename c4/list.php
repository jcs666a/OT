<html>
<head>
<script src="js/list.js"></script>
<link rel="stylesheet" href="css/list.css">

</head>
<body>
<div id="users">
  <input class="search" placeholder="Search" />
<input type="image" class="sort" height="10" width="10"data-sort="name" src="img/favico.gif">

  <ul class="list">
    <li>
      <h3 class="name">Jonny Stromberg</h3>
      <p class="born">1986</p>
    </li>
    <li>
      <h3 class="name">Jonas Arnklint</h3>
      <p class="born">1985</p>
    </li>
    <li>
      <h3 class="name">Martina Elm</h3>
      <p class="born">1986</p>
    </li>
    <li>
      <h3 class="name">Gustaf Lindqvist</h3>
      <p class="born">1983</p>
    </li>
  </ul>

</div>
<script type="text/javascript">
var options = {
  valueNames: [ 'name', 'born' ]
};

var userList = new List('users', options);
</script>
</body>
</html>
