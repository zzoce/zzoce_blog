---
title: "区间DP"
description: "区间类动态规划"
pubDate: Oct 03 2024
image: /image/index.webp
categories:
  - 数据结构与算法
tags:
  - 动态规划
badge: zzcoe
---


[区间 DP - OI Wiki (oi-wiki.org)](https://oi-wiki.org/dp/interval/)
区间类动态规划是线性动态规划的扩展，它在分阶段地划分问题时，与阶段中元素出现的顺序和由前一阶段的哪些元素合并而来有很大的关系

**性质**：
- **合并**：即将两个或多个部分进行整合，当然也可以反过来；
- **特征**：能将问题分解为能两两合并的形式；
- **求解**：对整个问题设最优值，枚举合并点，将问题分解为左右两个部分，最后合并两个部分的最优值得到原问题的最优值。




**例题**：
[P 1880 [NOI 1995] 石子合并 - 洛谷 | 计算机科学教育新生态 (luogu. Com. Cn)](https://www.luogu.com.cn/problem/P1880)

题目大意：在一个圆形操场的四周摆放 N 堆石子，现要将石子有次序地合并成一堆，规定每次只能选相邻的两堆合并成新的一堆，并将新的一堆的石子数，记为该次合并的得分。试设计出一个算法, 计算出将 N 堆石子合并成 1 堆过程中 **<font color="#c00000">所有得分和</font>**的最小得分和最大得分。

思路
1. 设 `f[i][j]` 为从 i 堆合并到 j 堆的所有的分的和的最大得分，则有转移方程 `f[i][j]=max(f[i][k]+f[k+1][j]+sum[j]-sum[i])`，表示 `f[i][j]` 由 `f[i][k]+f[k+1][j]` 两堆合并而来，`sum` 是石子分数的前缀和，`sum[j]-sum[i]` 表示本次合并的得分。 
2. 题目中石子围成的是一个环，而不是链，也就是第 `n` 堆可能会和第 `1` 堆合并，复制一份，放在第 `n` 堆后面，这样第 i 堆与第 `n+1` 堆相同。
3. 令 `1<=i<=n`，`i<j<i+n`，根据转移方程求 `f[i][i+n-1]` 即可

实现：
```cpp
for (int i=1;i<=n;i++){
	for (int j=i+1;j<i+n;j++){
 		for (int k=i;k<j;k++)
		f[i][j]=max(f[i][j],f[i][k]+f[k+1][j]+sum[j]-sum[i-1]);
	}
	MAX=max(MAX,f[i][i+n-1]);
}
```




