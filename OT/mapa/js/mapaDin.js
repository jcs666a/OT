
function mapRepository(){
	this.repository = {};
	this.putValor = function(llave, valor){
		this.repository[llave]=valor;
	}
	this.getValor = function(llave){
		return this.repository[llave];
	}
}
