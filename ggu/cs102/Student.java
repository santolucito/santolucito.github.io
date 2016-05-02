public class Student{
  
  String name;
  
  private int[] grades = new int[3];
  
  public void setGrade(int i, int grade){
    grades[i] = grade;
  }

  public int getGrade(int i){
    return grades[i];
  }
  public Student(String name){
    this.name = name;
  }
  
  public int finalGrade(){
    int grades = (grades[0]
                    +grades[1]
                    +grades[2])/3;
    return grades;
  }
}
