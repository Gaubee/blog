define("quicksort",[],function($){
// (function($){

	var Partition = function(Vector, low, high) { //定义为数据表类的共有函数，排序算法可直接调用它。
		var pivotpos = low;
		var pivot = Vector[low]; //基准元素
		for (var i = low + 1; i <= high; i+=1) {
			compare+=1;
			if (Vector[i] < pivot) { //检测整个序列进行划分
				pivotpos+=1;
				if (pivotpos != i) {
					var temp = Vector[pivotpos];
					Vector[pivotpos] = Vector[i];
					Vector[i] = temp;
				}
			}
		} //小于基准的交换到左侧屈
		Vector[low] = Vector[pivotpos];
		Vector[pivotpos] = pivot;
		step+=1;
		//将基准元素就位
		return pivotpos; //返回基准元素位置
	};
	var Quick = function(L, left, right) {
		if (left < right) { //元素序列长度大于1时
			var pivotpos = Partition(L, left, right); //划分
			Quick(L, left, pivotpos - 1); //对左侧子序列实行同样处理
			Quick(L, pivotpos + 1, right); //对右侧子序列实行同样处理
			//元素序列长度<=1时不处理
		}
	};
	var QuickSort = function(L) //快速排序
	{
		step = 0;
		compare = 0;
		var newLs = [];
		var newLslen = 0;

		Quick(L, 0, L.length - 1);

		var restule = {
			compare: compare,
			step: step,
			array:L
		};
		return restule;
	}
	QuickSort.name = "快速排序";
	Array.quicksort = QuickSort;
});
// var r = Array.QuickSort([2,3,4,1,23,12,3,15,12,34,123,123,0]);
// console.log(r)