function partiallyMapped(p1, p2) {
    let startNum = Math.floor(random(0, 20));
    let endNum = Math.floor(random(startNum, 20));
    let route = Array(startNum).fill(undefined);
    route[startNum] = p1.slice(startNum, endNum + 1);
    route = route.flat();

    for (let s = 0; s < startNum; s++) {
        random(0, 1) < mutationRate ? route[s] = chooseRandom(route) : route[s] = findMatch(route, p2, s);
    }

    for (let e = route.length; e < numCities; e++) {
        route.push(findMatch(route, p2, e));
    }

    return route;
}

function findMatch(route, p2, index) {
    if (!route.includes(p2[index])) {
        return p2[index];
    }

    return findMatch(route, p2, route.indexOf(p2[index]));
}

function order(p1, p2) {
    let startNum = Math.floor(random(0, 20));
    let endNum = Math.floor(random(startNum, 20));
    let route = Array(startNum).fill(undefined);
    route[startNum] = p1.slice(startNum, endNum + 1);
    route = route.flat();

    let p = endNum + 1;
    while (route.length < numCities) {
        if (!route.includes(p2[p % 20])) {
            route.push(p2[p % 20]);  
        }
        p++;
    }

    let pos = 0;
    p = 0;
    while (route.includes(undefined)) {
        if (!route.includes(p2[p])) {
            route[pos] = p2[p];
            pos++;
        }
        p++;
    }

    return route;
}

function cycle(p1, p2) {
    let route = [p1[0]];
    let nextCity = p2[0];

    while (true) {
        if (route.includes(nextCity)) {
            break;
        }

        route[p1.indexOf(nextCity)] = nextCity;
        nextCity = p2[p1.indexOf(nextCity)];
    }

    for (let i = 0; i < numCities; i++) {
        !route.includes(p2[i]) ? route[i] = p2[i] : null;
    }

    return route;
}

function chooseRandom(route) {
    return random(cities.filter(c => !route.includes(c)));
}