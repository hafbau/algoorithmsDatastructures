require 'minitest/autorun'
require_relative 'singly_linkedlist'

class LinkedListTest < Minitest::Test

  def test_empty_list_created
    slist = LinkedList.new
    assert_equal true, slist.empty_list?
  end

  def test_list_created_with_head
    slist = LinkedList.new(5)
    assert_equal 5, slist.head.data
    assert_equal nil, slist.tail.next_node
  end

  def test_append
    skip
    slist = LinkedList.new(5)
    slist.append(6)
    assert_equal [5, 6], slist.to_a
  end

  def test_prepend
    slist = LinkedList.new(5)
    slist.append(6)
    slist.prepend(4)
    assert_equal [4, 5, 6], slist.to_a
  end

  def test_insert_after
    slist = LinkedList.new(5)
    slist.append(6)
    slist.prepend(4)
    slist.insert_after(1, 14)
    assert_equal [4, 5, 14, 6], slist.to_a
  end

  def test_length
    slist = LinkedList.new(5)
    slist.append(6)
    slist.prepend(4)
    slist.insert_after(1, 14)
    assert_equal 4, slist.lenght
    assert_equal 4, slist.size
  end

  def test_delete_at_index
    slist = LinkedList.new(5)
    slist.append(6)
    slist.prepend(4)
    slist.insert_after(1, 14)
    slist.delete_at(1)
    assert_equal [4, 14, 6], slist.to_a
  end

  def test_delete_all_x
    slist = LinkedList.new(5)
    slist.append(6)
    slist.prepend(4)
    slist << 4
    slist.insert_after(1, 14)
    slist.delete_all(4)
    assert_equal [5, 14, 6], slist.to_a
  end

  def test_swap_nodes
    slist = LinkedList.new(5)
    slist.append(6)
    slist.prepend(4)
    slist.insert_after(1, 14)
    slist.swap_nodes(6, 4)
    assert_equal [6, 5, 14, 4], slist.to_a
    slist.swap_nodes(14, 4)
    assert_equal [6, 5, 4, 14], slist.to_a
    slist.swap_nodes(14, 5)
    assert_equal [6, 14, 4, 5], slist.to_a
  end
end