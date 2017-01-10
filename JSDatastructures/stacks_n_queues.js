// Stacks
	function Stack(capacity) {
		this.top = -1;
		this.capacity = capacity || 0;
		this.array = [];
	}

	Object.defineProperties(Stack.prototype, {
		"is_full": {
			value: function() {
						return this.top === this.capacity - 1;
					}
		},
		"is_empty": {
			value: function() {
						return this.top === -1;
					}
		},
		"push": {
			value: function(item) {
						if(this.is_full()) {
							throw "Stack Overflow";
						}
						this.array[++this.top] = item;
					}
		},
		"pop": {
			value: function() {
						if(this.is_empty()) {
							throw "Stack Underflow";
						}
						return this.array[this.top--];
					}
		},
		"peek": {
			value: function() {
						return this.is_empty ? undefined : this.array[this.top];
					}
		}
	});

// Two stacks using the same array
	function TwoStacks(capacity) {
		this.top1 = -1;
		this.top2 = this.capacity = capacity;
		this.array =[];
	}

	Object.defineProperties(TwoStacks.prototype, {
		"is_full": {
			value: function() {
						return this.top1 === this.top2 - 1;
					}
		},
		"is_empty": {
			value: function() {
						return this.top1 + this.top2 === capacity - 1;
					}
		},
		"push1": {
			value: function(item) {
						if(this.is_full()) {
							throw "Stack Overflow";
						}
						this.array[++this.top1] = item;
					}
		},
		"push2": {
			value: function(item) {
						if(this.is_full()) {
							throw "Stack Overflow";
						}
						this.array[--this.top2] = item;
					}
		},
		"pop1": {
			value: function() {
						if(this.top1 === -1) {
							throw "Stack Underflow";
						}
						return this.array[this.top1--];
					}
		},
		"pop2": {
			value: function() {
						if(this.top2 === this.capacity) {
							throw "Stack Underflow";
						}
						return this.array[this.top2++];
					}
		},
		"peek1": {
			value: function() {
						return this.top1 === -1 ? undefined : this.array[this.top1];
					}
		},
		"peek2": {
			value: function() {
						return this.top2 === this.capacity ? undefined : this.array[this.top2];
					}
		}
	});

// k+stacks using the same array
	function kStacks(k, capacity) {
		this.top = [];
		this.next = [];
		this.free = 0;
		this.array = [];

		// Initializing the 'top' and 'next' arrays
		(function() {
			for (var i = 0; i < k; i++) {
				this.top[i] = -1;
				this.next[i] = i + 1;
			}
			for (var i = k; i < n - 1; i++) {
				this.next[i] = i + 1;
			}
			this.next[n-1] = -1;
		})();
	}

	Object.defineProperties(kStacks.prototype, {
		"is_full": {
			value: function() {
				this.free === -1;
			}
		},
		"is_empty": {
			value: function(sn) {
				!!sn && (return this.top[sn] === -1);
				return this.free === 0
			}
			"push": {
				value: function(sn, item) {
					this.is_full() && throw "Stack Overflow";
					var free_idx = this.free;
					this.free = this.next(free_idx);

					this.next(free_idx) = this.top[sn];
					this.top[sn] = free_idx;
					this.array[free_idx] = item;
				}
			},
			"pop": {
				value: function(sn) {
					this.is_empty(sn) && throw "Stack Underflow";
					var idx = this.top[sn];
					this.top[sn] = this.next[idx];
					this.next[idx] = this.free;
					this.free = idx;
					return this.array[idx];
				}
			}
		}
	})

// Stack from two Queues: Experimenting with ES7 classes
	class StackFromTwoQueues {
		constructor(capacity) {
			this.working_q = new Queue(capacity);
			this.storing_q = new Queue(capacity);
		}

		push(data) {
			this.working_q.enqueue(data)
		}

		pop() {
			while(this.working_q.size > 1) {
				this.storing_q.enqueue(this.working_q.dequeue())
			}
			swap_duty_of_queues();
			return this.storing_q.dequeue()
		}

		swap_duty_of_queues() {
			let temp = this.working_q;
			this.working_q = this.storing_q;
			this.storing_q = temp;
		}
	}

// Queues
	function Queue(capacity) {
		this.head = 0;
		this.tail = 0;
		this.array = [];
		this.size = 0;
		this.capacity = capacity;
	}

	Object.defineProperties(Queue.prototype, {
		"is_full": {
			value: function() {
						return this.size === this.capacity;
					}
		},
		"is_empty": {
			value: function() {
						return !this.size;
					}
		},
		"enqueue": {
			value: function(item) {
						this.tail = this.fold(this.tail);
						if(this.is_full()) {
							throw "Stack Overflow";
						}
						this.array[this.tail++] = item;
						this.size++;
					}
		},
		"dequeue": {
			value: function() {
						this.head = this.fold(this.head);
						if(this.is_empty()) {
							throw "Stack Underflow";
						}
						this.size--;
						return this.array[this.head++];
					}
		},
		"peek_tail": {
			value: function() {
						return ( this.is_empty() ? undefined : this.array[this.tail-1] );
					}
		},
		"peek_head": {
			value: function() {
						return ( this.is_empty() ? undefined : this.array[this.head] );
					}
		},
		"fold": {
			value: function(to_fold) {
				return ( to_fold === this.capacity ? 0 : to_fold );
			}
		}
	});

// Queue from two Stacks: Experimenting with ES7 classes
	class QueueFromTwoStacks {
		constructor(capacity) {
			this.working_s = new Stack(capacity);
			this.storing_s = new Stack(capacity);
		}

		enqueue(data) {
			this.working_s.push(data)
		}

		dequeue() {
			while(this.working_s.size > 1) {
				this.storing_s.push(this.working_s.pop())
			}
			swap_duty_of_stacks();
			return this.storing_s.pop()
		}

		swap_duty_of_stacks() {
			let temp = this.working_s;
			this.working_s = this.storing_s;
			this.storing_s = temp;
		}
	}

// Testing for TwoStacks
	two_stacks = new TwoStacks(5);
	two_stacks.push1(5);
	two_stacks.push2(10);
	two_stacks.push2(15);
	two_stacks.push1(11);
	console.log(two_stacks.pop1());
	two_stacks.push2(40);
	console.log(two_stacks.pop2());

// Testing for Queues
	// var stack = new Queue(5);

	// var items = [2, 3, 4, 5, 1];
	// console.log(stack.array);
	// for (var i = 0; i < items.length; i++) {
	// 	stack.enqueue(items[i]);
	// }
	// console.log(stack.array);
	// for (var i = 2; i >= 0; i--) {
	// 	stack.dequeue();
	// }
	// console.log(stack.tail, stack.head);
	// stack.enqueue(15);
	// console.log(stack.tail, stack.head);
	// stack.enqueue(10);
	// stack.enqueue(13);
	// console.log(stack.array);
	// for (var i = 2; i >= 0; i--) {
	// 	stack.dequeue();
	// }

	// console.log(stack.tail, stack.head);
	// console.log(stack.peek_head());
	// stack.dequeue();
	// console.log(stack.tail, stack.head);
	// console.log(stack.peek_head());