---
title: "压状DP"
description: "将状态转为二进制，压缩为整数"
pubDate: Oct 03 2024
image: /image/index.webp
categories:
  - 数据结构与算法
tags:
  - 动态规划
badge: zzcoe
---


[状压 DP - OI Wiki (oi-wiki.org)](https://oi-wiki.org/dp/state/)
一般通过状态压缩将状态以整数的二进制形式来表示，`1` 表示改位置背选择，`0` 表示没有被选择。

**例题**：
[P 1896 [SCOI 2005] 互不侵犯 - 洛谷 | 计算机科学教育新生态 (luogu. Com. Cn)](https://www.luogu.com.cn/problem/P1896)
题目大意：在 N\*N 的棋盘里面放 K 个国王（1<=N<=9,1<=K<=N\*N），使他们互不攻击，共有多少种摆放方案。国王能攻击到它上下左右，以及左上左下右上右下八个方向上附近的各一个格子，共 8 个格子。

**思路**：
1. `f[i][j][l]` 表示第 `i` 行的状态为 `sit[j]`，且棋盘上已经放了 `l` 个国王的合法方案数。
2. `sit[j]` 的二进制中 `1` 就表示这个位置上放国王，`0` 表示不放。
3. `j` 的最大值就是单行最大的合法方案数，`sit[j]` 包含了单行的所有情况所以可以提前求出来
4. `sta[j]` 表示 `sit[j]` 的状态下需要多少个国王。即 `sit[j]` 中 `1` 的个数。
5. 状态转移方程 `f[i][j][l]=sum(f[i-1][x][l-sta[j]])` 遍历 `x`，即单行合法状态数量，当然 `sta[x]` 满足国王数量的限制
```cpp
void dfs(int x, int num, int cur) {
  if (cur >= n) {  // 有新的合法状态
    sit[++cnt] = x;//x就是压缩后的状态，cnt表示其数量
    sta[cnt] = num;//num就是该状态下使用的国王数量
    return;
  }
  dfs(x, num, cur + 1);  // cur位置不放国王
  dfs(x + (1 << cur), num + 1,cur + 2);  // cur位置放国王，与它相邻的位置不能再放国王
}

bool compatible(int j, int x) {
	//上下不能都是国王
  if (sit[j] & sit[x]) return false;
	//两个斜对角不能有国王
  if ((sit[j] << 1) & sit[x]) return false;
  if (sit[j] & (sit[x] << 1)) return false;
  //满足条件
  return true;
}

int main() {
  	cin >> n >> k;
  	dfs(0, 0, 0);  // 先预处理一行的所有合法状态，找到所有的单行合法状态
  	for (int j = 1; j <= cnt; j++) {//在第一行，任何一个单行合法状态都是合法的
  		f[1][j][sta[j]] = 1;
  	}
	for (int i = 2; i <= n; i++){//从第二行开始
  		for (int j = 1; j <= cnt; j++){//遍历所有单行合法状态。第i行
  			for (int x = 1; x <= cnt; x++) {//遍历所有单行合法状态。第i-1行
        		if (!compatible(j, x)) continue;  // 排除不合法转移
        		for (int l = sta[j]; l <= k; l++){
        		//累计第i行在sit[j]状态下的合法方案数
					f[i][j][l] += f[i - 1][x][l - sta[j]];
				}
    		}
		}
	}
  	long long ans = 0;
  	for (int i = 1; i <= cnt; i++) {
	  ans += f[n][i][k];  // 累加答案
	}
  	cout << ans << endl;
```


**例题**：

[P 5911 [POI 2004] PRZ - 洛谷 | 计算机科学教育新生态 (luogu. Com. Cn)](https://www.luogu.com.cn/problem/P5911)
题目大意：
有 `n` 个人需要过桥，第 i 的人的重量为 `w[i]`，过桥用时为 `t[i]`，这些人过桥时会分成若干组，只有在某一组的所有人全部过桥后，其余的组才能过桥。桥最大承重为 `W`，问这些人全部过桥的最短时间。`100≤W≤400 ，1≤n≤16，1≤t≤50，10≤w≤100`

**思路**：
同样使用状态压缩：`i` 的二进制中某一位为 `1` 表示这个人在这一组内，和大家一起过河，按照这样分组 **<font color="#c00000">共有</font>** `1<<n-1` **<font color="#c00000">种分组</font>** 情况，每种情况的状态压缩刚好对应一个整数。
1. `ts[i]`表示第`i`组（也就是 i 的二进制下`1`位为一组的情况）的情况下过桥需要的最长时间。
2. `ws[i]`表示第`i`组总体的体重。
3. 如何判断第`j`个人是否在第`i`组，**`i&(1<<j)==1`<font color="#c00000">则表示第</font>`j`<font color="#c00000">个人在第</font>`i`<font color="#c00000">组</font>**。
4. 先完成上述的分组，在对所有的组采用 DP 求出最优的解，这时遇到一个为题，即 **<font color="#c00000">第</font>`i` <font color="#c00000">组和第</font> `j` <font color="#c00000">组成员很有可能有重复的</font>**，那如何避免这样的情况呢。
5. 换个思路解决这个问题，既然第 `i` 组和第 `j` 组成员很有可能有重复的，那我们就 **<font color="#c00000">让其必然出现重复的</font>**，这样就可以 **<font color="#c00000">看成第</font> `i` <font color="#c00000">组是从第</font> `j` <font color="#c00000">组增加一组得来的</font>**，但于此有引入一个问题就是 **<font color="#c00000">要使的</font> `i` <font color="#c00000">的二进制要完全包含</font> `j` <font color="#c00000">的二进制</font>**，即 `j` 为 `1` 的位，`i` 也必为 `1`，**<font color="#c00000">并且要求出</font> `i` <font color="#c00000">为</font> `1` <font color="#c00000">而</font> `j` <font color="#c00000">不为</font> `1` <font color="#c00000">的位对应的组，以及两者都为</font> `1` <font color="#c00000">的组**</font>。
6. 既然这两个问题都是因二进制而生，那必然还需要用二进制运算解决，**<font color="#245bdb">解铃还须系铃人</font>**。
	1. 首先令`j=i-1`，则解决第一个问题，此时`j`为`1`的位`i`必为`1`。
	2. **<font color="#c00000">令</font> `j=i&j`**，与运算两者都为 1 结果为 `1`，反之为 `0`。此时的 **<font color="#245bdb">新</font>`j`<font color="#245bdb">就是重复的队员所组成的小组。</font>**
	3. 在 **<font color="#c00000">第二步的基础上，两组按位异或</font>`i^j`**，相同为零，相异为一。表示 `i` 组有而 `j` 组没有的队员所组成的小组，**<font color="#c00000">即新增的队员组成的小组</font>**。
	4. 然后不断重复`1`到`3`步即可，直到`j`为`0`。
	5. **<font color="#c00000">总的来说：</font>`i`<font color="#c00000">组是在</font>`i&(i-1)`<font color="#c00000">组的基础上再加上</font>`i^(i&(i-1))`<font color="#c00000">组得到的</font>**。
	6. 这两个问题看着很绕，但其是解决他们只需要的在`dp`时对`for`内进行一些修改即可：
```cpp
For (int j = i; j; j = i & (j - 1)){
	If (ws[i ^ j] <= W) 
	Dp[i] = min (dp[i], dp[j] + ts[i ^ j]);
} 
```

整体代码：
```cpp
Int main () {
  Int W, n;//桥的称重能力，以及过桥人数
  Cin >> W >> n;
  Const int S = (1 << n) - 1;//总的组队方案数，或者说组队方案。
  vector<int> ts (S + 1), ws (S + 1);
  For (int j = 0, t, w; j < n; ++j) {
    Cin >> t >> w;//第 j 个人过桥的时间，以及他的体重
    For (int i = 0; i <= S; ++i)//遍历所有方案
      If (i & (1 << j)) {//为 1 就表示第 j 个人在 i 这个方案中
        //更新时间和总重量
        Ts[i] = max (ts[i], t);
        Ws[i] += w;
      }
  }
  vector<int> dp (S + 1, numeric_limits<int>:: max () / 2);
  For (int i = 0; i <= S; ++i) {//遍历方案数
    If (ws[i] <= W) dp[i] = ts[i];//初始 i 方案的情况。
    //接下来这三行就是上面长篇大论的内容，看上面吧。
    For (int j = i; j; j = i & (j - 1))
      If (ws[i ^ j] <= W) dp[i] = min (dp[i], dp[j] + ts[i ^ j]);
  }
  Cout << dp[S] << '\n';
  Return 0;
}
```




