class Node:
    """Node for doubly circular linked list"""
    def __init__(self, data):
        self.data = data
        self.next = None
        self.prev = None

class CircularDoublyLinkedList:
    """Doubly circular linked list implementation for clock units (hours, minutes, seconds)"""
    def __init__(self, max_value):
        self.head = None
        self.current = None
        self.max_value = max_value
        self._initialize_list()
    
    def _initialize_list(self):
        """Initialize the circular list with values from 0 to max_value"""
        for i in range(self.max_value):
            self.insert(i)
        self.current = self.head
    
    def insert(self, data):
        """Insert a new node at the end of the list"""
        new_node = Node(data)
        
        if self.head is None:
            self.head = new_node
            new_node.next = new_node
            new_node.prev = new_node
        else:
            # Get the last node
            last = self.head.prev
            
            # Insert new node
            new_node.next = self.head
            new_node.prev = last
            last.next = new_node
            self.head.prev = new_node
    
    def move_forward(self):
        """Move to the next value in the circular list"""
        if self.current:
            self.current = self.current.next
        return self.current.data if self.current else 0
    
    def move_backward(self):
        """Move to the previous value in the circular list"""
        if self.current:
            self.current = self.current.prev
        return self.current.data if self.current else 0
    
    def set_value(self, value):
        """Set current position to a specific value"""
        if value < 0 or value >= self.max_value:
            return False
        
        temp = self.head
        for _ in range(self.max_value):
            if temp.data == value:
                self.current = temp
                return True
            temp = temp.next
        return False
    
    def get_current(self):
        """Get the current value"""
        return self.current.data if self.current else 0
    
    def get_all_values(self):
        """Get all values in the list (for debugging)"""
        if not self.head:
            return []
        
        values = []
        temp = self.head
        for _ in range(self.max_value):
            values.append(temp.data)
            temp = temp.next
        return values
