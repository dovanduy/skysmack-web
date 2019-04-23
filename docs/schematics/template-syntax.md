# Scheatic template syntax

```html

<% if (name) { %>
  <%= name %>
<% } else { %>
    <p>Name is missing.</p>
<% } %>

<!-- My test = my_test -->
<%= decamelize(name) %>

<!-- myTest = my-test -->
<%= dasherize(name) %>

<!-- my-test = myTest -->
<%= camelize(name) %>

<!-- my-test = MyTest -->
<%= classify(name) %>

<!-- MyTest = my_test -->
<%= underscore(name) %>

<!-- my_test = My_test -->
<%= capitalize(name) %>
```