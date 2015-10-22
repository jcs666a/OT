<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Untitled Document</title>
   	<script type="text/javascript" src="js/jquery-1.11.3"></script>
 <link rel="stylesheet" href="./css/canvas.css" type="text/css"/>
 <script type="text/javascript" src="./js/canvasXpress.min.js"></script>
 <script type="text/javascript" src="./js/sprintf-0.7-beta1"></script>

    <script id='demoScript'>

	/*function showDemo() {

		new CanvasXpress("canvasID", {
		  "venn": {
			"data": {
			  "A": 340,
			  "B": 562,
			  "C": 620,
			  "D": 592,
			  "AB": 639,
			  "AC": 456,
			  "AD": 257,
			  "BC": 915,
			  "BD": 354,
			  "CD": 143,
			  "ABC": 552,
			  "ABD": 578,
			  "ACD": 298,
			  "BCD": 613,
			  "ABCD": 148
			},
			"legend": {
			  "A": "List 1",
			  "B": "List 2",
			  "C": "List 3",
			  "D": "List 4"
			}
		  }
		}, {
		  "graphType": "Venn",
		  "maxTextSize": 18,
		  "colorScheme": "user",
		  "overlayFontSize": 10,
		  "vennGroups": 3,
		  "codeType": "pretty",
		  "imageDir": "http://www.canvasxpress.org/images/",
		  "remoteParamOverride": true,
		  "maxCols": 2
		})

      }
*/
	
	
 var showDemo = function () {
        var cx2 = new CanvasXpress("canvas2",
          {
            "venn": {
              "data": {
                "A": 340,
                "B": 562,
                "C": 620,
                "D": 592,
                "AB": 639,
                "AC": 456,
                "AD": 257,
                "BC": 915,
                "BD": 354,
                "CD": 143,
                "ABC": 552,
                "ABD": 578,
                "ACD": 298,
                "BCD": 613,
                "ABCD": 148
              },
              "legend": {
                "A": "List 1",
                "B": "List 2",
                "C": "List 3",
                "D": "List 4"
              }
            }
          	},{
			  "graphType": "Venn",
			  "maxTextSize": 18,
			  "colorScheme": "user",
			  "overlayFontSize": 10,
			  "vennGroups": 3,
			  "codeType": "pretty",
			  "imageDir": "http://www.canvasxpress.org/images/",
			  "remoteParamOverride": true,
			  "maxCols": 2
			}
        );
  }



	showDemo();

    </script>
</head>

<body>


<table>

<tr>
	<td><canvas id='canvas2' width='540' height='540'></canvas></td>
</tr>


</table>





</body>
</html>
