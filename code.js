function HashMap() {

    let hashMapArray = []
    let hashMapCapacity = {
        totalEntries: 0,
        totalBuckets: 16,
        calculateLoad: function () {
            if (this.totalEntries / this.totalBuckets > 0.75) {
                this.totalBuckets *= 2
            }
        },
        rehash: function () {
            let newHashMap = []
            for (let i = 0; i < hashMapArray.length; i++) {
                if (hashMapArray[i] !== undefined) {
                    let hashNum = hash(hashMapArray[i].value)
                    set(hashNum,hashMapArray[i].value, newHashMap)
                }

            }
            hashMapArray = newHashMap
        }
    }

    const stringToNumber = (string) => {
        let hashCode = 0
        const primeNumber = 31
        for (let i = 0; i < string.length; i++) {
            hashCode = primeNumber * hashCode + string.charCodeAt(i)
        }
        return hashCode
    }
    
    const hash = (value) => {
        return stringToNumber(value)
    }

    const set = (value,hashMap=hashMapArray) => {
        let key = hash(value) 
        let bucketNumber = (key % hashMapCapacity.totalBuckets)
        hashMap[bucketNumber] = {
            key,
            value,
        }
        hashMapCapacity.totalEntries += 1
        hashMapCapacity.calculateLoad()
    }

    const get = (key) => {
        let bucket = (key % hashMapCapacity.totalBuckets)
        if (hashMapArray[bucket] !== null) {
            let value = hashMapArray[bucket].value
            return value
        }
        return null
    }

    const has = (key) => {
        let bucket = (key % hashMapCapacity.totalBuckets)
        if (hashMapArray[bucket] !== null) {
            let bucketKey = hashMapArray[bucket].key
            if (key == bucketKey) return true
            else return false
        }
        else return false
    }

    const remove = (key) => {
        if (has(key) == true) {
            let bucket = (key % hashMapCapacity.totalBuckets)
            hashMapArray[bucket] = null
        }
    }

    const length = () => {
        let count = 0
        for (let i = 0 ; i < hashMapCapacity.totalBuckets; i++) {
            if (hashMapArray[i] !== null && hashMapArray[i] !== undefined) {
                count += 1
            }
        }
    return count
    }

    const clear = () => {
        for (let i = 0; i < hashMapCapacity.totalBuckets; i++) {
            hashMapArray[i] = null
        }
    }

    const keys = () => {
        let keysArray = []
        for (let i = 0; i < hashMapCapacity.totalBuckets; i++) {
            if (hashMapArray[i] !== null && hashMapArray[i] !== undefined) {
                keysArray.push(hashMapArray[i].key)
            }
        }
        return keysArray
    }

    const values = () => {
        let valuesArray = []
        for (let i = 0; i < hashMapCapacity.totalBuckets; i++) {
            if (hashMapArray[i] !== null && hashMapArray[i] !== undefined) {
                valuesArray.push(hashMapArray[i].value)
            }
        }
        return valuesArray
    }

    const entries = () => {
        let entriesArray = []
        for (let i = 0; i < hashMapCapacity.totalBuckets; i++) {
            if (hashMapArray[i] !== null && hashMapArray[i] !== undefined) {
                entriesArray.push({key: hashMapArray[i].key,value: hashMapArray[i].value})
            }
        }
        return entriesArray
    }

    return {hashMapArray,hashMapCapacity,hash,set,get,has,remove,clear,length,keys,values,entries}
}