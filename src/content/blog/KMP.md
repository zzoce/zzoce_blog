---
title: "KMP"
description: "经典字符串匹配算法"
pubDate: Oct 03 2024
image: /image/index.webp
categories:
  - 笔记
  - 面试
tags:
  - 数据结构
badge: zzcoe
---

[图解KMP算法，带你彻底吃透KMP-CSDN博客](https://blog.csdn.net/qq_43869106/article/details/128753527)
[P3375 【模板】KMP - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P3375)

```cpp
#include <iostream>
#include <cstring>
#include <string>
#define ll long long 
using namespace std;
const int MAXN =1e6+5;
int ne[MAXN];
void get_next (string s){
	int j=0;
	ne[j]=0;
	for (int i=1;i<s.size();i++){//i指针指向的是后缀末尾，j指针指向的是前缀末尾
		while (j>0&&s[i]!=s[j])j=ne[j-1];//前后缀不相同，去找j前一位的最长相等前后缀
		if (s[i]==s[j])j++;//前后缀相同，j指针后移
		ne[i]=j;//更新next数组
	}
}
int main ()
{
	string s,t;
	cin>>s>>t;
	get_next (t);
	
	for (int i=0,j=0;i<s.size();i++){
		while (j>0&&s[i]!=t[j]) j=ne[j-1];
		if (s[i]==t[j]) j++;
		if (j==t.size()){
			cout<<i-t.size()+2<<endl;
			if (j>=1){
				j=ne[j-1];
			}
		}
	}
	cout<<ne[0];
	for (int i=1;i<t.size();i++){
		cout<<" "<<ne[i];
	}
	return 0;
	
 } 
```