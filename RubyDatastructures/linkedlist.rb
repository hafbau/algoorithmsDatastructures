class Node
  attr_accessor :data, :next_node

  def initialize(data)
    @data = data
    @next_node = nil
  end
end

class LinkedList
  attr_accessor :head, :tail, :current

  def initialize(head_data = nil)
    @head = Node.new(head_data)
    # @current = head
    @tail = head
  end

  def length
    len(@head)
  end
  alias_method :size, :length
  alias_method :lenght, :length
  alias_method :count, :length

  def swap_nodes(data1, data2)
    prev_node1, node1 = prev_n_current_nodes(data1)
    prev_node2, node2 = prev_n_current_nodes(data2)
    fail ArgumentError, "Out of range" unless node1 && node2

    test_if_head_then_swap(prev_node1, node2)
    test_if_head_then_swap(prev_node2, node1)
    temp = node2.next_node
    node2.next_node = node1.next_node
    node1.next_node = temp
  end

 # Delete the first node with data
  def delete(data)
    deleting(prev_n_current_nodes(data))
  end

  def delete_all(data)
    while detect(data)
      delete(data)
    end
  end

  def delete_at(pos)
    prev_node = node_at(pos - 1)
    curr_node = prev_node.next_node if prev_node
    deleting([prev_node, curr_node])
  end

  def empty_list?
    !@head.data
  end

  def append(data)
    new_node = Node.new(data)
    head.data ? @tail.next_node = new_node : @head = new_node
    @tail = new_node
  end

  alias_method :<<, :append

  def prepend(data)
    new_node = Node.new(data)
    new_node.next_node = head
    @head = new_node
  end

  # index (idx) here starts from zero, with the head at index zero
  def insert_after(idx, data)
    curr_node = node_at(idx)
    fail ArgumentError, "index is out of range" unless curr_node
    new_node = Node.new(data)
    new_node.next_node = curr_node.next_node
    curr_node.next_node = new_node
  end


  def each(curr_node = head, &block)
    return to_enum(:each) unless block_given?

    while curr_node && curr_node.data
      yield(curr_node)
      curr_node = curr_node.next_node
    end
  end

  alias_method :traverse, :each

  def to_a
    all_nodes.map {|node| node.data }
  end

  private

  def len(node)
    1 + len(node.next_node).to_i if node
  end

  def prev_n_current_nodes(data)
    curr_node = @head
    while curr_node && curr_node.data != data
      prev_node = curr_node
      curr_node = curr_node.next_node
    end
    [prev_node, curr_node]
  end

  def test_if_head_then_swap(prev, node)
    prev ? prev.next_node = node : @head = node
  end

  def node_at(index)
    curr_node = @head
    index.times { curr_node = curr_node.next_node if curr_node }
    curr_node
  end

  def first_node_with(data)
    prev_n_current_nodes(data).last
  end
  alias_method :detect, :first_node_with
  alias_method :find, :first_node_with
  alias_method :node_with, :first_node_with

  def node_before_node_with(data)
    prev_n_current_nodes(data).first
  end
  alias_method :detect_prev, :node_before_node_with
  alias_method :find_prev, :node_before_node_with

  def deleting(prev_n_curr_arry)
    prev_node, curr_node = prev_n_curr_arry
    fail ArgumentError, "Out of range" unless curr_node
    prev_node.next_node = curr_node.next_node if prev_node
    @head = head.next_node if curr_node == head
  end

  def all_nodes
    all_nodes_ary = []
    self.each do |node|
      break if all_nodes_ary.include? node
      all_nodes_ary.push node
    end

    all_nodes_ary
  end

end
