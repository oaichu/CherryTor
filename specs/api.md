# EDGE API SPECIFICATION — CHERRYTOR

## Endpoint: POST /api/v1/search

### Request Headers
```http
Content-Type: application/json
Accept: application/json
```

### Request Body Schema
```json
{
  "type": "object",
  "required": ["provider", "query"],
  "properties": {
    "provider": {
      "type": "string",
      "enum": ["canonical-releases", "arch-mirror", "blender-foundation", "godot-community", "debian-cd"]
    },
    "query": {
      "type": "string",
      "minLength": 1,
      "maxLength": 200
    },
    "category": {
      "type": "string",
      "enum": ["ALL", "Software", "Movies", "Other"]
    }
  },
  "additionalProperties": false
}
```

### Response Body Schema (200 OK)
```json
{
  "data": [
    {
      "id": "string",
      "title": "string",
      "category": "string",
      "sizeBytes": 0,
      "seeders": 0,
      "leechers": 0,
      "infoHash": "string (40-hex or 32-base32)",
      "magnetUri": "string (strictly magnet:?xt=urn:btih:...)",
      "sourceId": "string",
      "publishedAt": "string (ISO8601)",
      "rankingSignals": {
        "availability": 0.95,
        "freshness": 0.9,
        "metadataCompleteness": 1.0,
        "providerConfidence": 0.98,
        "score": 96.1
      }
    }
  ],
  "errors": [],
  "meta": {
    "provider": "canonical-releases",
    "latencyMs": 42,
    "timestamp": "2026-08-20T14:30:00Z"
  }
}
```

### Response Status Errors
- `400 Bad Request`: Invalid provider ID or query outside 1–200 characters.
- `429 Too Many Requests`: Global or per-provider rate limit exceeded.
- `502 Bad Gateway / 504 Gateway Timeout`: Upstream provider unreachable or circuit breaker open (isolated, returned in error metadata).
