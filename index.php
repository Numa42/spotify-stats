<!doctype html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Spotify Stats</title>
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
    <style type="text/css">
      #login, #loggedin {
        display: none;
      }
      .text-overflow {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 500px;
      }
    </style>
</head>

<body>
    <h1>Spotify stats</h1>
    <button type="button" onclick="top5()">Top 5 des titres des 30 derniers jours</button>
    <?php
    echo "<p>".$_GET["code"]."</p>"
    ?>
</body>
<script src="script.js"></script>
</html>

