# You are given the pointer to the head node of a linked list. You have to print all of its elements in order in a single line.
#  
# Input:
# You have to complete a method which takes one argument: the head of the linked list. You should not read any input from stdin/console. The struct Node has a data part which stores the data and a next pointer which points to the next element of the linked list. There are multiple test cases. For each test case, this method will be called individually.

# Output:
# Print the elements of the linked list in a single line separated by a single space.

# Example:
# Input
# 2
# 2
# 1 2
# 1
# 4
# Output
# 1 2
# 4


# To be used only for expected output :
# Here the first line denotes an integer 'T' the no of test cases and the next line denotes 'N' the no of nodes of linked list . Then the line after that contains N space separated integers denoting the values of the nodes of the linked list .=end

require_relative 'singly_linkedlist'

def slinkedlist_test(input)
  input_ary = input.split("\n")
  num_of_tests = input_ary.shift.to_i

  tests = input_ary

  num_of_tests.times do |_|
    num_of_nodes = tests.shift
    nodes = tests.shift.split(" ")

    slist = LinkedList.new
    nodes.each {|node| slist << node }

    p slist.to_a.join(" ")
  end
end

input_text = "2\n2\n1 2\n1\n4"

slinkedlist_test(input_text)