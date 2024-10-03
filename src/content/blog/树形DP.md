---
title: "树状DP"
description: "也就是再树上做DP，有递归实现"
pubDate: Oct 03 2024
image: /image/index.webp
categories:
  - 笔记
tags:
  - 数据结构
badge: zzcoe
---


# 树上 DP

[树形 DP - OI Wiki (oi-wiki.org)](https://oi-wiki.org/dp/tree/)

**树状 DP**：如名字所说，树状 DP 就是在树上做 DP，由于树的特殊性质，通过递归实现。

**例题一**
[P1352 没有上司的舞会 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P1352)
题目大意：某大学有 `n ` 个职员，编号为 `1…n` 他们之间有从属关系，也就是说他们的关系就像一棵以校长为根的树，父结点就是子结点的直接上司。现在有个周年庆宴会，宴会每邀请来一个职员都会增加一定的快乐指数 `r[i]` ​，但是呢，如果某个职员的直接上司来参加舞会了，那么这个职员就无论如何也不肯来参加舞会了。所以，请你编程计算，邀请哪些职员可以使快乐指数最大，求最大的快乐指数。

使用 `max（f[i][0/1]）` 来表示最优解，`0` 表示这个人不参加舞会的，`1` 表示这个人参加舞会的情况，于是有
```cpp
void calc(int k) {
  vis[k] = 1;//表示k已经判断过
  for (int i = head[k]; i; i = e[i].next) {  // 枚举该结点的每个子结点
    if (vis[e[i].v]) continue;//判断过就跳过
    calc(e[i].v);
    f[k][1] += f[e[i].v][0];
    f[k][0] += max(f[e[i].v][0], f[e[i].v][1]);  // 转移方程
  }
  return;
}
```
**注意**：最后的结果为 `max(f[1][0],f[1][1])`;

**例题二**
[P 8625 [蓝桥杯 2015 省 B] 生命之树 - 洛谷 | 计算机科学教育新生态 (luogu. Com. Cn)](https://www.luogu.com.cn/problem/P8625)
```cpp
//
#include <iostream>
#include <cstring>
#include <algorithm>
#include <vector>
const int mod = 2147483647;
using namespace std;
int mp[100010];
long long int  dp[100010];
vector<int> E[100010];
void dfs (int u,int fa){
    dp[u]=mp[u];
    int len=E[u].size();
    for (int i=0;i<len;i++){
        int t=E[u][i];
        if (t!=fa){
            dfs (t,u);
            if (dp[t]>0){
                dp[u]+=dp[t];
            }
        }
    }
}
int main ()
{
    int n;
    cin>>n;
    for (int i=1;i<=n;i++){
        cin>>mp[i];
    }
    int a,b;
    for (int i=1;i<n;i++){
        cin>>a>>b;
        E[a].push_back(b);
        E[b].push_back(a);
    }
    dfs (1,0);
    long long int  ans=0;
    for (int i=1;i<=n;i++){
        ans=max(ans,dp[i]);
    }
    cout<<ans<<endl;
    return 0;
}
```

**例题三**
[P 8744 [蓝桥杯 2021 省 A] 左孩子右兄弟 - 洛谷 | 计算机科学教育新生态 (luogu. Com. Cn)](https://www.luogu.com.cn/problem/P8744)
```cpp
#include <iostream>
#include <cstring>
#include <algorithm>
#include <vector>
const int mod = 2147483647;
using namespace std;
int mp[100010];
long long int  dp[100010];
vector<int> E[100010];
void dfs (int u,int fa){
    dp[u]=mp[u];
    long long int MAX=0;
    int len=E[u].size();
    for (int i=0;i<len;i++){
        int t=E[u][i];
        if (t!=fa){
            dfs (t,u);
            dp[u]=max(dp[u],len+dp[t]-1);
        }
    }
}
int main ()
{
    int n;
    cin>>n;
    for (int i=2;i<=n;i++){
        //cin>>mp[i];
        mp[i]=1;
    }
    int a;
    for (int i=2;i<=n;i++){
        cin>>a;
        E[a].push_back(i);
        E[i].push_back(a);
    }
    dfs (1,0);
    long long int  ans=-1*mod;
    for (int i=1;i<=n;i++){
        ans=max(ans,dp[i]);
    }
    cout<<ans<<endl;
    return 0;
}
```

# 树上背包

[P 2014 [CTSC 1997] 选课 - 洛谷 | 计算机科学教育新生态 (luogu. Com. Cn)](https://www.luogu.com.cn/problem/P2014)
题目大意：
现在有 `n` 门课程，第 `i` 门课程的学分为 `a[i]`，每门课程有零门或一门先修课，有先修课的课程需要先学完其先修课，才能学习该课程. 一位学生要学习 m 门课程，求其能获得的最多学分数。

思路：本题集合了树形 dp 以及背包问题。一门先修课下面可能有多门其他课程，所以要使用背包来枚举选了哪几门课，然后再合并到先修课上，使用树状递归
```cpp
int dfs(int u) {
  int p = 1;//先学u才能学他的子课
  f[u][1] = s[u];//学分
  for (auto v : e[u]) {//遍历u的子课程
    int siz = dfs(v);//子课程的数量，不是学分哦
    // 注意下面两重循环的上界和下界
    // 只考虑已经合并过的子树，以及选的课程数超过 m+1 的状态没有意义
    for (int i = min(p, m + 1); i; i--){//p为已经遍历过的课程数量，但不包括当前这个子树
	    for (int j = 1; j <= siz && i + j <= m + 1; j++){//遍历当前个子树的情况
		    f[u][i + j] = max(f[u][i + j], f[u][i] + f[v][j]);  // 转移方程
		    //f[u][k]就表示在以u为先导课的子课中选k门课（包括u）的情况下的最高学分
	    }
	}  
    p += siz;
  }
  return p;//以U为先导课的子课数量
}
```

# 换根

