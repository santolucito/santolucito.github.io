public class Classroom{
  
  public static void main(String[] args){
  
    Student s1 = new Student("Maria");
    
    //s1.grades[0] = 90;
    s1.setGrade (0,90);
    s1.setGrade (1,80);
    s1.setGrade (2,100);
    
    Student s2 = new Student("Maria");
    
    s2.setGrade (0,60);
    s2.setGrade (1,90);
    s2.setGrade (2,100);
    
    //System.out.println(finalGrade(s1));
    System.out.println(s1.finalGrade());
    System.out.println(s2.finalGrade());
    System.out.println(s1.name);
    
    int [] grades = new int[3];
  }
  
    public static int finalGrade(){
    int grades = (grades[0]
                    +grades[1]
                    +grades[2])/3;
    return grades;
  }

}