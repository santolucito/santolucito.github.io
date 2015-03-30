---
layout: default
title: Syntax
---


For this study we will use StriSynth to generate PowerShell commands to complete a scripting task.
A typical workflow with StriSynth be as follows
- Open StriSynth 
- Start learning a new operation 
- Provide examples 
- Export learned script
- Run the learned script from PowerShell to generate a sequence of PowerShell commands (a .ps1 script) or a .txt file.


Here is an example run of task 0 to generate a script that appends the letter '''A''' to every file.
`scala> NEW 
scala> "file.txt" ==> "mv file.txt fileA.txt; "
scala> "test.pdf" ==> "mv test.pdf testA.pdf; "
scala> (TRANSFORM as map) in PowerShell to "task0/transf_Script.ps1"

PS> cd task0
PS> .\transf_Script.ps1 (ls | select -ExpandProperty Name)
`

Below are the types of examples from which StriSynth can extrapolate a generalized script. 
While all need at least one example, partition and filter require at least two examples.
You do not need to declare which operation you are learning, StriSynth will figure it out for you - just provide the examples!

In general, given more examples, the synthesised script will be more accurate.
To this end, it may be advised to err on the side of caution and provide plenty of examples, but please feel free to develop a feel for the system as you see fit. 
Every task we will ask you to complete is possible to accomplish with StriSynth. 

#TRANSFORM String -> String
Transforms a single string into another string.

'''scala> NEW 
scala> "file.txt" ==> "mv file.txt fileA.txt"
scala> "test.pdf" ==> "mv test.pdf testA.pdf"
scala> TRANSFORM
'''

#REDUCE :: List(String) -> String 
Transforms a list or tuple of strings into another string.  To use 5 or more elements, you need to prefix the tuple with the \verb+List+ keyword.  \touse{the reduce algorithm}{REDUCE}.

'''scala> NEW 
scala> ("file.txt", "2015", "folder") ==> "mv file.txt folder/file2015.txt"
scala> REDUCE
'''

#"..." (meta-string)
You can use the meta-string "..." to invoke auto-completion. An example of the use of the meta-string "..." with REDUCE is the following:

'''
scala> NEW 
scala> ("a.1.pdf", "a.2.pdf", "a.3.pdf") ==> "convert a.1.pdf a.2.pdf... a.pdf"
scala> REDUCE
'''

#SPLIT :: String -> List(String)
Splits a string into a list of strings  The meta-string "..." can be also be used with SPLIT to say that the extraction continues. 

'''
scala> NEW 
scala> "a.1.pdf a.2.pdf a.3.pdf" ==> ("a.1.pdf", "a.2.pdf", "...")
scala> SPLIT
'''

#FILTER :: List(String) -> List(String)
Filters a list of strings into a shorter list of strings (based on YES examples). It uses the YES and NO keywords. It requires at least (the more, the better) two positive examples and one negative.

'''
scala> NEW 
scala> YES ==> ("a.1.pdf", "b.2.pdf")
scala> NO ==> ("1.a.pdf")
scala> FILTER
'''

#PARTITION :: List(String) -> List(List(String))
Splits a list of strings into multiple sublists. The syntax is similar to FILTER except that it does not use the YES or NO keywords. It requires at least two partition examples with two elements in each.

'''
scala> NEW 
scala> ==> ("a.1.pdf", "a.2.pdf")
scala> ==> ("b.1.pdf", "b.2.pdf")
scala> PARTITION
'''

#as map :: (a -> b) -> (List(a) -> List(b))
Applies a StriSynth operation over a list and returns a list. When using "as map", StriSynth can learn a counter for both TRANSFORM and REDUCE results. Its value will depend on the position of the string in the list.

'''
scala> NEW 
scala> "file.txt" ==> "file496.txt"
scala> "test.pdf" ==> "test498.pdf"
scala> (TRANSFORM as map)(List("document.txt", "report.pdf", "legend.jpg"))
List("document496.txt", "report498.pdf", "legend500.jpg")
'''

#| :: (a-> b) -> (b -> c) -> (a -> c)
Infix operator to compose two transformations. Either assign the result to a variable or export it directly. If the composition is not possible, a warning will be issued explaining why and script exportation will be empty. \textbf{NB} If you have used composition in a functional language before this is the reverese order. You might think of our composition operator as expressing "andThen".

'''
scala> NEW; "(file).txt" ==> "file.txt"; val t = TRANSFORM
scala> NEW; ("file.txt", "report.pdf") ==> "echo '''file report...''' > index.txt"
scala> ((t as map) | REDUCE)(List("(document).txt", "report.pdf", "legend.jpg"))
"echo '''document report legend''' > index.txt"
'''

 Please read again this section until you feel comfortable with the syntax. If you have any questions, please ask Mikael.
