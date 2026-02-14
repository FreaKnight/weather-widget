# weather-widget
Micro frontend to display weather data

## Usage

```javascript
(function () {}
    const script = document.createElement('script');
    script.src = 'https://{{domain}}/widget-bundle.js'; // Firebase url
    script.async = true;
    document.head.appendChild(script);

    // Users just drop this tag in their Html
    // <weather-widget city="New York" theme="dark />
)();
```

## Planning

```javascript
const svg = d3.select(this.shadowRoot).append('svg');

function updateWeather(data) {
    const t = svg.transition().duration(750);

    svg.selectAll('.temp-line')
        .data([data.hourly])
        .join(
            enter => enter.append('path').attr('class', 'temp-line'),
            update => update.transition(t),
            exit => exit.remove()
        )
        .attr('d', lineGenerator)
}
```
